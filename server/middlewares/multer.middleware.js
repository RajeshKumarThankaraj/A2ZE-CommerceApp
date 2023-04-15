const multer = require("multer");
const path = require("path");
const fs = require("fs");
const appRoot = require("app-root-path");
const { v4: uuidv4 } = require("uuid");

const upload = (type) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        try {
          const folderName =
            type === "product"
              ? `${appRoot}/uploads/images/${req.productId}`
              : `${appRoot}/uploads/images/${req.params.productId}`;

          if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
          }

          cb(null, folderName);
        } catch (err) {
          console.error(err);
          cb("Error Uploading image.");
        }
      },
      filename: function (_req, file, cb) {
        const fileId = uuidv4();
        cb(
          null,
          type +
            "-" +
            fileId.replace(/-/g, "") +
            path.extname(file.originalname)
        );
      },
    }),
    limits: {
      fileSize: 1000000,
    },
    fileFilter: function (_req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif|webp|bmp/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(
          "Unauthorised file type. Accepted files are of type JPEG, GIF, BMP, PNG."
        );
      }
    },
  });
};

module.exports = upload;
