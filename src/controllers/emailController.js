const SendEmailUtility = require("../utility/sendEmailUtility");

exports.sendEmail = (req, res) => {
  const toEmail = req.body.toEmail;
  const subject = req.body.subject;
  const text = req.body.text;
  const html = req.body.html;

  SendEmailUtility(toEmail, text, subject, html)
    .then((result) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "Innalillah",
        data: error,
      });
    });
};
