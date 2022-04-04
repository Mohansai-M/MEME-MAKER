require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const Grid = require("gridfs-stream");
const uploadcontroller = require("./controllers/Imageuploadmiddleware");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload')


const app = express();
Code: app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride("_method"))

//connect to MongoDb
app.use('/user', require('./routes/UserRouter'))

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

let gfs;

const conn = mongoose.connection;

conn.once("open", () => {
  gfs =  Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});




app.get("/", (req, res) => {
  
  gfs.files.find().toArray((err, files)=> {

    if(!files || files.length === 0)
    {
      return res.status(404).json({ err: "No Files Exists" });
    }

    return  res.json(files)
  })

});


app.post("/image/upload", uploadcontroller.single("file"), async (req, res) =>
 {
  if (req.file === undefined) 
  return res.status(400).send("you must select a file.");
  else{  
    
  const imgUrl = `http://localhost:5000/image/${req.file.filename}`;
  return res.send(imgUrl, req.file.metadata.filetag,req.file.metadata.originalname);}
});





app.get("/file/:filename", async (req, res) => {
   gfs.files.findOne({ filename: req.params.filename },(err,file)  =>
    {
         if(!file || file.length === 0)
        {
            return res.status(404).json({err: "No File Exists"})
        }
        //FileExists
        return res.json(file)
    });
});


app.get("/image/:filename", async (req, res) =>
{
   gfs.files.findOne({ filename: req.params.filename },(err,file)  =>
    {
         if(!file || file.length === 0)
        {
            return res.status(404).json({err: "No File Exists"})
        }
        //FileExists
       
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: 'photos',});
      const readstream = bucket.openDownloadStreamByName(file.filename);
      readstream.pipe(res);
    } 
        else{
            res.status(404).json({err:"Not an Image"})
        }
    });
});



app.delete("/image/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    res.send("An error occured.");
  }
});

if(process.env.NODE_ENV === "production")
{
  app.use(express.static('cient/build'))
}