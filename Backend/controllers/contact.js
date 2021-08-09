const nodemailer = require('nodemailer');
const { google } = require('googleapis');

exports.sendMail = (req, res, next) => {

const CLIENT_ID = '472792302764-ooklit8moul095mkdeikrsl8dmerjk2c.apps.googleusercontent.com';
const CLIENT_SECRET = '2BboIEefWxAN6_VocuqbWFDn';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04mHvr33xIBMOCgYIARAAGAQSNwF-L9Ir3FdT59RheIAqHvpKiwKLug38QBfMaGb3ofMSgUllfVZ42Fm2RKXrNLHzyZLcYa7B9WI';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = oAuth2Client.getAccessToken();
const from = req.body.email;
const subject = req.body.subject;
const message = req.body.message;

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "mimica2001@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
    }
    });

var mailOptions = {
    from: from,
    to: 'danivilovski@gmail.com',
    subject: subject,
    text: message
};

transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

res.status(201).json({
    message: 'Email sent'
  });
};

