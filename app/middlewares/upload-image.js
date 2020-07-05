const multer = require("multer");
const maxSize = 1000000; // 1 MB
const storageDate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },

  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
      cb(null, Date.now() + "." + filetype);
    }

    if (file.mimetype === "image/png") {
      filetype = "png";
      cb(null, Date.now() + "." + filetype);
    }

    if (file.mimetype === "image/jpeg") {
      filetype = "jpeg";
      cb(null, Date.now() + "." + filetype);
    } 
    
    else {
      console.log(file)
      console.log(file.mimetype === "image/png")
      console.log(file.mimetype == "image/png")

      cb(new Error("only image file is allowed"));
    }
  },
});

const storageName = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadDate = multer({
  storage: storageDate,
  limits: { fileSize: maxSize },
});

const uploadName = multer({
  storage: storageName,
  limits: { fileSize: maxSize },
});

const upload = (req, res, next) => {
  const uploadImage = uploadDate.single("image");
  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
    // Everything went fine.
    next();
  });
};

module.exports = {
  upload,
};
