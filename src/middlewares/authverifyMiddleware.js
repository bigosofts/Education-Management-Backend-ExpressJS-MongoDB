const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

// This middleware is being used for verify the token that provided by req header, extracted user payload and find username intoken and authorized username  then send to the req header so that response can do appropriate actions
module.exports = (req, res, next) => {
  if (req.headers["access_token"]) {
    jwt.verify(
      req.headers["access_token"],
      process.env.SECRETKEY_JWT_WEBTOKEN,
      (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: "UnauthorizedAccess",
            data: err,
          });
        } else {
          let authorizedUser = decoded["data"]["userName"];
          let authorizedRole = decoded["data"]["userRole"];
          let authorizedAdmin = decoded["data"]["isAdmin"];
          let userDetails = decoded["data"];

          req.headers["userName"] = authorizedUser;
          req.headers["userRole"] = authorizedRole;
          req.headers["isAdmin"] = authorizedAdmin;

          req.body.access_token = userDetails;

          next();
        }
      }
    );
  } else {
    res.status(200).json({
      status: "noToken",
    });
  }
};
