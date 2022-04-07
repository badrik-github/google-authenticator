/**
Project: google-authenticator apis 
version : v0.1
author : @badrik-github , @jimishio
desc : Controllers
*/

//libraries 
const crypto = require("crypto");

//Modules
const { Users } = require("../Modules/users");

//Functions
const { getSecret, getQrCodeData, verifyOtp } = require("./function");


//Register controller
exports.register = async (req, res) => {
    try {

        let { name, email, password } = req.body;

        let user = new Users();

        user.name = name;
        user.email = email;
        user.encryptPassword = crypto.createHmac('sha256', user.salt)
            .update(password)
            .digest('hex')

        user.googleSecret = await getSecret(email);

        await user.save();

        return res.status(200).json({
            'isSuccess': true,
            "data": user.googleSecret,
            'message': 'Ok'
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            'isSuccess': false,
            "data": {},
            'message': 'Internal Server Error Occurred'
        });
    }
}

exports.getQrCode = async (req, res) => {
    try {
        let { email } = req.body;

        let user = await Users.findOne({ email: email }).lean();

        let sourceData = await getQrCodeData(user.googleSecret.otpauth_url);

        return res.status(200).json({
            'isSuccess': true,
            "data": {
                "img": sourceData
            },
            'message': 'Ok'
        });
    }
    catch (err) {
        return res.status(500).json({
            'isSuccess': false,
            "data": {},
            'message': 'Internal Server Error Occurred'
        });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { email, OTP } = req.body;

        let user = await Users.findOne({ email: email }).lean();

        let isValid = await verifyOtp(user.googleSecret.base32, OTP);

        return res.status(200).json({
            'isSuccess': true,
            "data": {
                "valid": isValid
            },
            'message': 'Ok'
        });
    }
    catch (err) {
        return res.status(500).json({
            'isSuccess': false,
            "data": {},
            'message': 'Internal Server Error Occurred'
        });
    }
}