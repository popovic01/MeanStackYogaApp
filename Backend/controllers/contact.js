const nodemailer = require('nodemailer');
const { google } = require('googleapis');

exports.sendMail = (req, res, next) => {

const CLIENT_ID = '472792302764-ooklit8moul095mkdeikrsl8dmerjk2c.apps.googleusercontent.com';
const CLIENT_SECRET = '2BboIEefWxAN6_VocuqbWFDn';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04_NR21lU-3qICgYIARAAGAQSNwF-L9IrhMUOKiQcS0w7MM6fKBUtLfPKMsPEohVU4a15VGIyJKHXZzJKr6SNX2rN7nurZiWUpgI';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = oAuth2Client.getAccessToken();
const from = req.body.email;
console.log(from);
const fullName = req.body.fullName;
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
    from: fullName + from,
    to: 'danivilovski@gmail.com',
    subject: subject,
    text: message
};

transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else
      console.log('Email sent');
  });

res.status(201).json({
    message: 'Email sent'
  });
};

