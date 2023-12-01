const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const farmerDetailsSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const farmerCropsSchema = Schema({
    farmerId: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    crops: [
        {
            details: {
                label: {type: String},
                Country: {type: String},
                ph: {type: Number},
                temperature:{type: Number},
                humidity:{type: Number},
                waterAvailability:{type: Number},
            },
            predictions: {type: Array}
        }
    ]
})

farmerDetailsSchema.pre('validate', function (next){
    console.log(Number(process.env.PASSWORD_SALTING))
    bcrypt.hash(this.password, Number(process.env.PASSWORD_SALTING))
    .then((hashedPassword)=>{
        this.password = hashedPassword
        console.log(this.password);
        next()
    })
    .catch((err)=>{
        console.log(err);
    })
})

farmerDetailsSchema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (error, same)=>{
        if (!error) {
            callback(error, same)
            console.log(same)
        } else{
            next()
        }
    })   
}


const farmerDetailsModel = model('farmerDetailsModel', farmerDetailsSchema);
const farmerCropsModel = model('farmerCropsModel', farmerCropsSchema);

module.exports = {farmerDetailsModel, farmerCropsModel}