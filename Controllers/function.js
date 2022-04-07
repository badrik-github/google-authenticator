/**
Project: google-authenticator apis 
version : v0.1
author : @badrik-github , @jimishio
desc : Util For Google 2fa.
*/

//Requiring libraries
const speakeasy = require("speakeasy");
const qrcode = require('qrcode');

/**
 * @param {string} email //email of the user 
 */
//creating secret using user email
exports.getSecret = async (email) => {

    return new Promise((resolve, reject) => {

        //this will be reflected in the google authenticator app
        let secret = speakeasy.generateSecret({
            name: `app-name(${email})`
        });

        //sending secret back
        resolve(secret);
    })
}

/**
 * @param {string} url // url to generate qr code
 */
//getting qr code
exports.getQrCodeData = async (url) => {

    return new Promise((resolve, reject) => {
        qrcode.toDataURL(url, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

/**
 * @param {string} base32 //secret we get from google
 * @param {number} otp //otp entered by user
 */
//verifying otp we get from google authenticator
exports.verifyOtp = async (base32, otp) => {

    //returning true if otp matches or false
    return new Promise((resolve, reject) => {
        var verified = speakeasy.totp.verify({
            secret: base32,
            encoding: 'base32',
            token: otp
        });

        resolve(verified);
    })
}