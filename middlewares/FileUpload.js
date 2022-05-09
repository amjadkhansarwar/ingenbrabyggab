const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + '-' + Date.now())
    }
  });
   
  const  upload = multer({ storage: storage });

module.exports=  upload