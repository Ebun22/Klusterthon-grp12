import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, f1_score, accuracy_score, confusion_matrix
import pickle
from sklearn.preprocessing import LabelEncoder 
import json
from sklearn.multioutput import MultiOutputClassifier
from flask_cors import CORS
import requests
import os
from flask import Flask, request, jsonify
import csv

app = Flask(__name__)

# Enable CORS for all origins, methods, and headers
CORS(app, resources={r"/*": {"origins": "*", "methods": "*", "headers": "*"}})

def train_and_save_regression_model(filename):
    df = pd.read_csv(filename)

    # Check for null values
    null_values = df.isnull().sum()
    numerical_cols = ['temperature', 'humidity', 'water availability', 'ph']
    # Fill missing values with the mean if there are
    imputer = SimpleImputer(strategy='mean')
    df[numerical_cols] = imputer.fit_transform(df[numerical_cols])

    # Prepare the dataset for regression model
    X_reg = df[['label', 'Country', 'harvest season']]
    
    # Create an example label encoder
    label_encoders = {}

    for col in X_reg:
        # Creating a new LabelEncoder for each categorical column
        label_encoder = LabelEncoder()
        
        # Fitting and transforming the column and saving the encoder
        df[col] = label_encoder.fit_transform(df[col])
        label_encoders[col] = label_encoder
    # Saving the label encoders using pickle
    with open('label_encoders.pkl', 'wb') as file:
        pickle.dump(label_encoders, file)
            
    df = df.rename(columns={col + '_encoded': col for col in X_reg})
    X_reg_encoded = df[['label', 'Country']]

    # Save the encoder to a file using pickle
    y_regression = df[numerical_cols]

    # Normalize numerical columns using Min-Max scaling
    scaler = MinMaxScaler()

    # Fit and transform on training data
    y_regression = scaler.fit_transform(y_regression)

    # Split the data for training and testing the regression model
    X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(X_reg_encoded, y_regression, test_size=0.2, random_state=42)

    # Train Random Forest Regression model
    rf_regression_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_regression_model.fit(X_train_reg, y_train_reg)

    # Save the trained model
    with open('regression_model.pkl', 'wb') as model_file:
        pickle.dump(rf_regression_model, model_file)

    # Metrics for Regression Model
    y_pred_reg = rf_regression_model.predict(X_test_reg)
    mae_reg = mean_absolute_error(y_test_reg, y_pred_reg)
    residuals = y_test_reg - y_pred_reg
    
    os.makedirs('residuals_histograms', exist_ok=True)

    for i in range(len(y_test_reg[0])):
        plt.figure(figsize=(8, 5))
        plt.hist(residuals[:, i], bins=30, color='blue', alpha=0.7)
        plt.title(f'Histogram of Residuals for Target Variable {i+1}')
        plt.xlabel('Residuals')
        plt.ylabel('Frequency')
        filename = os.path.join('residuals_histograms', f'residuals_histogram_{i}.png')
        plt.savefig(filename)
        plt.close()  
    return {'mae_reg': mae_reg}


def train_and_save_classification_model(filename):
    df = pd.read_csv(filename)

    # Check for null values
    null_values = df.isnull().sum()
    
    numerical_cols = ['temperature', 'humidity', 'water availability', 'ph']
    
    imputer = SimpleImputer(strategy='mean')
    df[numerical_cols] = imputer.fit_transform(df[numerical_cols])
    
    # Prepare the dataset for 'season' classification model
    
    # Normalize numerical columns using Min-Max scaling
    scaler = MinMaxScaler()

    # Fit and transform on training data
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])
    # Save the scaler to a file using pickle
    with open('scaler.pkl', 'wb') as file:
        pickle.dump(scaler, file)
    y_classification_harvest_season = df['harvest season']
    
    categorical_cols = ['label', 'Country', 'harvest season']
    label_encoders = {}

    for col in categorical_cols:
        label_encoder = LabelEncoder()
        df[col] = label_encoder.fit_transform(df[col])
        label_encoders[col] = label_encoder

    with open('label_encoders.pkl', 'wb') as file:
        pickle.dump(label_encoders, file)
    X_class_encoded = df.drop('harvest season', axis = 1)
    print(X_class_encoded)

    
    # Split the data for training and testing the classification model
    X_train_class, X_test_class, y_train_class_harvest, y_test_class_harvest = train_test_split(X_class_encoded, y_classification_harvest_season, test_size=0.2, random_state=42)
    print(X_train_class)
    rf_classifier_harvest = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_classifier_harvest.fit(X_train_class, y_train_class_harvest)
    
    # Save the trained model for 'harvest season'
    with open('classification_model_harvest.pkl', 'wb') as model_file:
        pickle.dump(rf_classifier_harvest, model_file)

    # Make predictions on the test set for 'harvest season'
    y_pred_class_harvest = rf_classifier_harvest.predict(X_test_class)
    f1_cls = f1_score(y_test_class_harvest, y_pred_class_harvest, average='weighted')

    return {'f1_cls': f1_cls}

def preprocess_rgs_input_data(input_data):
    # Additional preprocessing steps if needed
    df = pd.DataFrame(input_data, index=[0])
    cols_mapper = {'country':'Country'}
    df = df.rename(columns = cols_mapper)
    # Load label encoders
    with open('label_encoders.pkl', 'rb') as file:
        loaded_label_encoders = pickle.load(file)
    columns_to_encode = ['label', 'Country']
    for col in columns_to_encode:
        # Transforming the new data using the loaded label encoder
        label_encoder = loaded_label_encoders[col]
        df[col] = label_encoder.transform(df[col])
    return df.values

def preprocess_cls_input_data(input_data):
    df = pd.DataFrame(input_data, index=[0])
    cols_mapper = {
        'country':'Country',
        'waterAvailability':'water availability',
        'pH':'ph'
    }
    df = df.rename(columns = cols_mapper)
    numerical_cols = ['temperature', 'humidity', 'water availability', 'ph']
    columns_to_encode = ['label', 'Country']
    # Load label encoders
    with open('label_encoders.pkl', 'rb') as file:
        loaded_label_encoders = pickle.load(file)
    print(df)
    for col in columns_to_encode:
        # Transforming the new data using the loaded label encoder
        label_encoder = loaded_label_encoders[col]
        df[col] = label_encoder.transform(df[col])
        # Load the scaler from the file
    with open('scaler.pkl', 'rb') as file:
        loaded_scaler = pickle.load(file)
    df[numerical_cols] = loaded_scaler.transform(df[numerical_cols])
    return df.values

def load_and_predict_regression_model(input_data):
    # Load the trained regression model
    with open('regression_model.pkl', 'rb') as model_file:
        loaded_regression_model = pickle.load(model_file)

    # Make predictions using the loaded regression model
    predictions = loaded_regression_model.predict(input_data)

    return predictions

def load_and_predict_classification_model(input_data):
    # Load the trained classification model
    with open('classification_model_harvest.pkl', 'rb') as model_file:
        loaded_classification_model = pickle.load(model_file)

    # Make predictions using the loaded classification model
    predictions = loaded_classification_model.predict(input_data)

    return predictions

def combined_predict(input_data):
    try:
        if 'label' in input_data and 'country' in input_data and not("temperature" in input_data and "humidity" in input_data and "pH" in input_data and "waterAvailability" in input_data and "label" in input_data and "country" in input_data ):
            # If input has 'label' and 'crops', pass it to regression model
            regression_input = {
                'label': input_data['label'],
                'Country': input_data['country'],
            }
            processed_input_data = preprocess_rgs_input_data(regression_input)
            processed_input_data = processed_input_data.reshape(1, -1)

        # Call the function to load and predict using the regression model
            regression_predictions = load_and_predict_regression_model(processed_input_data)
            regression_predictions = regression_predictions.tolist()
            regression_predictions = regression_predictions[0]
            
            regression_output = {
                'temperature': regression_predictions[0],
                'humidity': regression_predictions[1],
                'ph': regression_predictions[2],
                'water availability': regression_predictions[3]
            }

                            
            print(regression_output)
            # Combine the original input with regression predictions
            new_input = {**input_data, **regression_output}
            processed_input_data = preprocess_cls_input_data(new_input)
            classification_input = processed_input_data.reshape(1, -1)
        elif 'label' in input_data  and 'country' in input_data and "temperature" in input_data and "humidity" in input_data and "pH" in input_data and "waterAvailability" in input_data  and "label" in input_data and "country" in input_data:
            # If input doesn't have 'label' and 'crops', pass it directly to classification model
            processed_input_data = preprocess_cls_input_data(input_data)
            classification_input = processed_input_data.reshape(1, -1)
        classification_predictions = load_and_predict_classification_model(classification_input)

        return jsonify({"predictions": classification_predictions.tolist()})
    except KeyError as e:
        return jsonify({"error": str(e)})

# Endpoint for combined prediction
@app.route("/predict_combined/", methods=["POST"])
def predict_combined():
    input_data = request.json
    output = combined_predict(input_data)
    return output
    
# Example usage:
metrics_regression = train_and_save_regression_model('Crop_Data.csv')
metrics_classification = train_and_save_classification_model('Crop_Data.csv')
with open('metrics_results.csv', 'w', newline='') as csvfile:
    fieldnames = ['metric', 'value']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    # Write regression metrics
    for metric, value in metrics_regression.items():
        writer.writerow({'metric': metric, 'value': value})

    # Write classification metrics
    for metric, value in metrics_classification.items():
        writer.writerow({'metric': metric, 'value': value})

if __name__ == "__main__":
    app.run(debug=True)
