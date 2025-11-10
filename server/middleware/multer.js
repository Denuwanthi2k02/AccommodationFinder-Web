// import multer from "multer";

// const upload = multer({ storage: multer.diskStorage({}) });

// export default upload;



import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
