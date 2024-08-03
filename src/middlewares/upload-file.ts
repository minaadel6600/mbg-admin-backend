import multer from 'multer'; 

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });

const upload = multer(
  {
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024, // limit file size to 50MB
    },
  }
  );



 export default upload;