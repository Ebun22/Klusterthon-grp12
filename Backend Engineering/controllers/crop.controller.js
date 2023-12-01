const axios = require('axios');
const { farmerDetailsModel, farmerCropsModel } = require('../models/farmer.model');

// Function to get the crop's prediction
const getCropPrediction = async (req, res) => {
    console.log(req.body);
    let { country, label, ph, temperature, humidity, waterAvailability, id } = req.body;
    if (temperature == undefined) {
        console.log('First Model Request');
        // const fetchData = async (url, data) => {
        //     const headers = new Headers({ "Content-Type": "application/json" });
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers,
        //         body: JSON.stringify(data),
        //         redirect: 'follow'
        //     });
        //     return response.json();
        // };

            // const regressionResult = await fetchData("https://prediction-engine-practice.onrender.com/predict_regression/", { label, country: country });
            // if(!regressionResult?.predictions){
            //     res.status(478).json({message: 'No Prediction For The Datas Provided'})
            //     return;
            // }
            // const classificationData = {
            //     label,
            //     country,
            //     temperature: regressionResult.predictions[0][0],
            //     humidity: regressionResult.predictions[0][1],
            //     "water availability": regressionResult.predictions[0][2],
            //     ph: regressionResult.predictions[0][3]
            // };

            // const classificationResult = await fetchData("https://prediction-engine-practice.onrender.com/predict_classification/", classificationData);

            // if(!classificationResult?.predictions){
            //     res.status(478).json({message: 'No Prediction For The Datas Provided'})
            //     return;
            // }
            // const cropDetails = {
            //     country,
            //     label,
            //     ph: classificationData.ph,
            //     temperature: classificationData.temperature,
            //     humidity: classificationData.humidity,
            //     waterAvailability: classificationData["water availability"]
            // };

            // const upload = await farmerCropsModel.findOneAndUpdate({ farmerId: id }, { $push: { crops: { details: cropDetails, predictions: classificationResult.predictions } } });

            // if (!upload) {
            //     await farmerCropsModel({ farmerId: id, crops: [{ details: cropDetails, predictions: classificationResult.predictions }] }).save();
            // }

            // res.status(200).json({ details: cropDetails, predictions: classificationResult.predictions });
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "label": label,
                "country": country,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

        fetch("https://prediction-engine-practice.onrender.com/predict_combined/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (!result?.predictions) {
                    res.status(478).json({ message: 'No Prediction For The Datas Provided' })
                    return;
                }
                let upload = farmerCropsModel.findOneAndUpdate({ farmerId: id }, { $push: { crops: { details: { country, label, ph, temperature, humidity, waterAvailability }, predictions: result.predictions } } })
                if (upload == null) {
                    farmerCropsModel({ farmerId: id, crops: [{ details: { country, label, ph, temperature, humidity, waterAvailability }, predictions: result.predictions }] }).save()
                }
                res.status(200).json(data = { details: { country, label, ph, temperature, humidity, waterAvailability }, predictions: result.predictions });
            })
            .catch((err)=>{
                console.log('An error occurred', err)
                res.status(478).json({ message: 'No Prediction For The Datas Provided' })
            })
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "label": label,
            "country": country,
            "temperature": temperature,
            "humidity": humidity,
            "water availability": waterAvailability,
            "ph": ph
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://prediction-engine-practice.onrender.com/predict_classification/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!result?.predictions) {
                    res.status(478).json({ message: 'No Prediction For The Datas Provided' })
                    return;
                }
                let upload = farmerCropsModel.findOneAndUpdate({ farmerId: id }, { $push: { crops: { details: { country, label, ph, temperature, humidity, waterAvailability }, predictions: result.predictions } } })
                if (upload == null) {
                    farmerCropsModel({ farmerId: id, crops: [{ details: { country, label, ph, temperature, humidity, waterAvailability }, predictions: result.predictions }] }).save()
                }
                res.status(200).json(data = { details: { country, label, ph, temperature, humidity, waterAvailability }, predictions: result.predictions });
            })
            .catch(error => {
                console.log('error', error)
                res.status(478).json({ message: 'No Prediction For The Datas Provided' })
            });

    }
}

const findCrop = async (req, res) => {
    const regex = new RegExp(searchLetter, 'i'); // 'i' flag for case-insensitive search

    // Use $regex to search for the letter in any field
    const result = await farmerCropsModel.find({ $or: [{ crops: { $regex: regex } }] }).toArray();
    // [
    //     {
    //       $search: {
    //         index: "default",
    //         text: {
    //           query: "cotton",
    //           path: {
    //             wildcard: "*"
    //           }
    //         }
    //       }
    //     }
    //   ]
    console.log('Search result:', result);
}

module.exports = { getCropPrediction }