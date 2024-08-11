const menuModel = require("../models/menuModel");

exports.createMenu = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let menuTitle = reqBody.menuTitle;
  let menuLink = reqBody.menuLink;
  let menuIcon = reqBody.menuIcon;
  let menuType = reqBody.menuType;
  let activeStatus = reqBody.activeStatus;
  let subMenu = reqBody.subMenu;
  //Make res body for posting to the Database

  let postBody = {
    menuTitle: menuTitle,
    menuLink: menuLink,
    menuIcon: menuIcon,
    menuType: menuType,
    activeStatus: activeStatus,
    subMenu: subMenu,
  };

  

  // Create Database record
  menuModel
    .create(postBody)
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

// find from the database record
exports.selectMenus = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  menuModel
    .find(query, projection)
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

//Update Database Record
exports.updateMenu = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    menuTitle: {
      en: reqBody.menuTitle.en,
      bn: reqBody.menuTitle.bn,
    },
    menuLink: reqBody.menuLink,
    menuIcon: reqBody.menuIcon,
    menuType: reqBody.menuType,
    activeStatus: reqBody.activeStatus,
    subMenu: reqBody.subMenu,
  };

  menuModel
    .updateOne({ _id: filter }, { $set: postBody }, { upsert: true })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

//Deleting from database
exports.deleteMenu = (req, res) => {
  let _id = req.params.id;

  menuModel
    .deleteOne({ _id: _id })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};
