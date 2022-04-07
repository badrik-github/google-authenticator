/**
Project: google-authenticator apis 
version : v0.1
author : @badrik-github , @jimishio
desc : Routers
*/

//libraries
const express = require('express');
const router = express.Router();

//controllers
const { register, getQrCode, verifyOtp } = require("./../Controllers/auth");


//Router for sign-up
router.post("/register", register);

//Router to generate QR code
router.post("/get-qr-code", getQrCode);

//Router to verify otp
router.post("/verify-otp", verifyOtp);


//Exporting routers
module.exports = router;