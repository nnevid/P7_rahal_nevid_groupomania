const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/public/uploads/profil");
  },
  filename: (req, file, callback) => {
    const name = "profile-picutre";
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + extension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("fichier invalide"));
    }
    callback(null, true);
  },
  limits: {fileSize: 500000},
});

module.exports = multer({ storage, upload }).single("file");
