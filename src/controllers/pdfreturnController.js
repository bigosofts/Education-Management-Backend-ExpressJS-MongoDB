const request = require("request");
const { readFileUrlFromDrive } = require("../utility/driveUtility");

exports.returnPDF = (req, res) => {
  const fileID = req.params.id;

  const pdfUrl = `https://drive.google.com/uc?export=download&id=${fileID}`;

  request({ url: pdfUrl, encoding: null }, (err, resp, buffer) => {
    if (err) {
      res.status(500).send("Error fetching PDF file");
    } else {
      res.contentType("application/pdf");
      res.send(buffer);
    }
  });
};

exports.returnPDFDocument = async (req, res) => {
  const fileID = req.params.id;
  const response = await readFileUrlFromDrive(fileID);
  res.status(200).json(response);
};
