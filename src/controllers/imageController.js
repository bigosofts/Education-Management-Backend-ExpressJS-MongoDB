exports.readImage = (req, res) => {
  const fs = require("fs");
  const path = require("path");

  function getAllImagePaths(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    const imageFiles = files.filter((file) => {
      const extname = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(extname);
    });

    // Generate the correct URLs
    const transformedPaths = imageFiles.map((file) => {
      const urlPath = path.join("images", file).replace(/\\/g, "/");
      return `${process.env.BACKEND}/${urlPath}`;
    });

    return transformedPaths;
  }

  // Use path.resolve to get the absolute path
  const directoryPath = path.resolve("public/images");
  const imagePaths = getAllImagePaths(directoryPath);

  res.status(200).json({
    status: "Alhamdulillah",
    data: imagePaths,
  });
};
