const express = require('express');
const { createAccount, signIn, getFarmerDetails, sendResetPasswordLink, verifyResetToken, resetPassword } = require('../controllers/farmer.controller');
const router = express.Router();

router.post('/create_account', createAccount)
router.post('/sign_in', signIn)
router.get('/details', getFarmerDetails)
router.post('/request_reset_password_link', sendResetPasswordLink)
router.post('/validate_reset_password_token', verifyResetToken)
router.post('/reset_password', resetPassword)


module.exports = router;