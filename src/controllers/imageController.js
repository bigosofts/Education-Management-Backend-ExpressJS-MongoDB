exports.readImage = (req, res) => {
  const fs = require("fs");
  const path = require("path");

  function getAllImagePaths(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    const imageFiles = files.filter((file) => {
      const extname = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(extname);
    });

    const imagePaths = imageFiles.map((file) => path.join(directoryPath, file));

    // Replace common root path with an empty string
    
    
    const transformedPaths = imagePaths.map((imagePath) =>
      imagePath.replace(/\\/g, "/").replace("../public", process.env.BACKEND)
    );

    return transformedPaths;
  }

  const directoryPath = "../public/images";
  const imagePaths = getAllImagePaths(directoryPath);

  res.status(200).json({
    status: "Alhamdulillah",
    data: imagePaths,
  });
};
