const multer = require('multer');
const mimeExtension = {
  "image/png": ".png",
  "image/svg": ".svg",
  "image/jpg": ".jpg",
  "image/jepg": ".jepg",
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/images');
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split(".")[0] +
        "." +
        Date.now() +
        mimeExtension[file.mimetype]
    )}
});

const upload = multer({ storage: storage });
module.exports = upload;
