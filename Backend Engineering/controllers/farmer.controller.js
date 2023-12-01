const { farmerDetailsModel, farmerCropsModel } = require("../models/farmer.model");
const { sign, verify } = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    },

})

// Function For The Famer's Create Account
const createAccount = (req, res) => {
    console.log(req.body);
    const farmerDetails = req.body;
    farmerDetailsModel(farmerDetails).save()
        .then((details)=>{
            res.status(200).json({message: 'Account Created'})
            console.log(details)
            let mailOptions = {
                from: process.env.USER_EMAIL,
                to: [details.email],
                subject: 'Pasword Reset',
                html: `<div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px;">
                        <h1 style="color: #333333;">Welcome to Klusterthon!</h1>
                        <p style="color: #666666;">Dear ${details.firstName},</p>
                        <p style="color: #666666;">Thank you for creating an account on Klusterthon! We're excited to have you on board.</p>
                        <p style="color: #666666;">To get started, click the button below to log in to your account:</p>
                        <a href="" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #4CAF50; color: #ffffff; border-radius: 5px; transition: background-color 0.3s;" target="_blank">Log In</a>
                        <p style="color: #666666;">If you have any questions or need assistance, feel free to contact our support team at [Your Support Email].</p>
                        <p style="color: #666666;">Best regards,<br>Klusterthon Team</p>
                    </div>
                    `
            }
            transporter.sendMail(mailOptions)
            .then((response)=>{
                console.log(response)
                res.status(200).json({message: 'Email Sent'})
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err)=>{
            console.error(err);
            if(err.code = 11000){
                res.status(478).json({message: 'Email Already Exist'})
            } else {
                res.status(500).json({message: 'Server Error'})
            }
        })
}

// Function For The Farmer's Sign In
const signIn = (req, res) => {
    console.log(req.body);
    let { password, email } = req.body
    farmerDetailsModel.findOne({ email })
        .then(async(details) => {
            console.log(details)
            if (details == null) {
                res.status(477).json({message: 'Invalid Login Email'})
                return;
            }
            let findCrops = await farmerCropsModel.findOne({farmerId: details._id})
            details.validatePassword(password, (error, same) => {
                if (same) {
                    let token = sign({ email }, JWT_SECRET, { expiresIn: '3650d' })
                    if(findCrops==null){
                        farmerCropsModel({farmerId: details._id, crops: []}).save()
                        let localDetails = {details, crops: []}
                        res.status(200).json({ message: 'Successful', details: localDetails, token })
                    } else {
                        let localDetails = {details, crops: findCrops.crops}
                        res.status(200).json({ message: 'Successful', farmer: localDetails, token })                   
                    }
                    
                } else {
                    res.status(478).json({message:  'Wrong Password'})
                }
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'Server Error'})
        })
}

// Function For Getting The Farmer's Details
const getFarmerDetails = (req, res) => {
    let token = req.headers.authorization.split(' ')[1]
    verify(token, JWT_SECRET, (error, result) => {
        if (!error) {
            farmerDetailsModel.findOne({email: result.email})
            .then(async(details)=>{
                let findCrops = await farmerCropsModel.findOne({farmerId: details._id})
                if(findCrops==null){
                    farmerCropsModel({farmerId: details._id, crops: []}).save()
                    let localDetails = {details, crops: []}
                    res.status(200).json( localDetails )
                } else {
                    let localDetails = {details, crops: findCrops.crops}
                    res.status(200).json( localDetails )                    
                }
            })
            .catch((err)=>{
                console.error(err)
            })            
        } else {
            res.status(476).json({ message: 'Invalid Token' })
        }
    })
}

// Function For Requesting Forgotten Password Link
const sendResetPasswordLink = (req, res) => {
    let { email } = req.body;
    farmerDetailsModel.findOne({email}, {firstName: 1})
    .then((details)=>{
        if(details == null){
            return res.status(478).json({message: 'Invalid Email'})
        }
        let token = sign({ email }, JWT_SECRET, { expiresIn: '1h' })
        let mailOptions = {
            from: process.env.USER_EMAIL,
            to: [email],
            subject: 'Pasword Reset',
            html: `<div class="container">
            <h2>Password Reset Request</h2>
            <p>Dear ${details.firstName},</p>
            <p>We received a request to reset the password associated with your account. To proceed with the password reset, please follow the instructions below:</p>
            <ol>
              <li><strong>Click on the following link to reset your password:</strong>
                <br>
                <a href="[Password Reset Link]">Password Reset Link</a>
                <br><br>
                <em>Note: This link is valid for the next 1 hour. After that, you will need to submit another password reset request.</em></li>
              <li><strong>If you did not request a password reset, please ignore this email.</strong> Your account security is important to us.</li>
              <li><strong>Ensure that you are using a secure and up-to-date web browser when accessing the link.</strong></li>
            </ol>
            <p>If you encounter any issues or need further assistance, please contact our support team at <a href="[Support Email or Phone Number]">[Support Email or Phone Number]</a>.</p><p>
              Thank you for your prompt attention to this matter.</p>
            <p>Best regards,<br>[Your Company Name]<br>[Your Company Contact Information]</p></div>`
        }
        transporter.sendMail(mailOptions)
        .then((response)=>{
            console.log(response)
            res.status(200).json({message: 'Email Sent', token})
        })
        .catch((err) => {
            console.log(err);
        });
    })
}

// Fuction For Validating Reset Password Token
const verifyResetToken = (req, res) => {
    let { token } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    verify(token, JWT_SECRET, (error, result) => {
        if (!error) {
            farmerDetailsModel.findOne({email: result.email}, {firstName: 1, lastName: 1})
            .then((details)=>{
                res.status(200).json({ details })
            })
            .catch((err)=>{
                console.error(err)
            })            
        } else {
            res.status(476).json({ message: 'Invalid Token' })
        }
    })
}

// Function For Reseting The Password
const resetPassword = (req, res) => {
    let {token, password} = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    verify(token, JWT_SECRET, (error, result) => {
        if (!error) {
            let hashedPassword;
            bcrypt.hash(password, Number(process.env.PASSWORD_SALTING))
            .then((newPassword)=>{
                farmerDetailsModel.findOneAndUpdate({email: result.email}, {password: newPassword})
                .then((details)=>{
                    res.status(200).json({ message: 'Successful' })
                })
                .catch((err)=>{
                    console.error(err)
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        } else {
            res.status(476).json({ message: 'Invalid Token' })
        }
    })
}

module.exports = {createAccount, signIn, getFarmerDetails, sendResetPasswordLink, verifyResetToken, resetPassword}