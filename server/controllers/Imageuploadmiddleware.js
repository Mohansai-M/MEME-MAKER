const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");



const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;

     // const metadata = req.body.filetag;
      
      return filename,metadata;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
      metadata: {body:req.body,url: `http://localhost:5000/image/${Date.now()}-any-name-${file.originalname}`,},
    };
  },

});

 

module.exports = multer({ storage });
