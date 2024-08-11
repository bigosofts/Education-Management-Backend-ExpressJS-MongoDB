const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

const fs = require("fs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Set the refresh token
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

const getFolderId = async (folderName) => {
  try {
    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: "files(id, name)",
      spaces: "drive",
    });

    if (res.data.files.length > 0) {
      return res.data.files[0].id;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error checking for folder:", err);
    throw err;
  }
};

exports.createFolder = async (folderName) => {
  try {
    const folderId = await getFolderId(folderName);
    if (folderId) {
      return folderId;
    }

    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    };

    const res = await drive.files.create({
      requestBody: fileMetadata,
      fields: "id",
    });

    return res.data.id;
  } catch (err) {
    console.error("Error creating folder:", err);
    throw err;
  }
};

exports.uploadFileToDrive = async (fileMetadata, media, folderId) => {
  try {
    fileMetadata.parents = [folderId];

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name, mimeType, parents",
    });

    return {
      status: 200,
      data: res.data,
    };
  } catch (err) {
    return {
      status: 500,
      data: err.response.data,
    };
  }
};

exports.deleteFileFromDrive = () => {
  const fileId = "1IJPQiTY2fYclaleg37XsH3Ej4crfpX3J";
  try {
    drive.files
      .delete({
        fileId,
      })
      .then((res) => {
        console.log(res);
      });
  } catch (err) {
    console.log(res);
  }
};

exports.readFileUrlFromDrive = async (ID) => {
  const fileId = ID;

  try {
    const permissionsResponse = await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    if (permissionsResponse.status === 200) {
      const fileResponse = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
      });

      return fileResponse.data;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
