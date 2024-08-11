const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// Create a new OAuth2 client with the credentials

const clientID =
  "58356191028-rke6be02ah7qcc8fe1gd4fuhfe6knsof.apps.googleusercontent.com";
const clientSecret = "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";
const redirectURI = "https://developers.google.com/oauthplayground";
const refreshToken =
  "1//047UJQGnivunbCgYIARAAGAQSNwF-L9IrczB3WpG3scmWOwY6-pAz07KmwROvAXOl_X3FpmSIdjvTeQhdIXWBnO10MEJjQsme1eA";

const oAuth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  redirectURI
);

// Set the refresh token
oAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject, html) => {
  try {
    // Get an access token
    const accessToken = await oAuth2Client.getAccessToken();

    // Create Nodemailer transporter using OAuth2
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "internetmadrasha@gmail.com",
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    let mailOptions = {
      from: "Internet Madrasa <internetmadrasha@gmail.com>",
      to: EmailTo,
      subject: EmailSubject,
      text: EmailText,
      html: html,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

module.exports = SendEmailUtility;
