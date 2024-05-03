const router = require("express").Router();
const multer = require("multer");
const DB = require("../../integrations/mongodb");
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

router.post("/create", async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage, limits: {
      fileSize: 9000000, // 9mb maximum size
      files: 1, // maximum 1 file
    }
  })

  upload.single('track')(req, res, (err) => {
    if (err) {
      console.log(err);
      // return res.status(400).json({message: 'Upload Request Validation Failed'});
      return res.status(400).json({ message: err.message });
    } else if (!req.body.name) {
      return res.status(400).json({ message: 'No track name in request body' });
    }

    let trackName = req.body.name;

    // convert buffer to readable stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new GridFSBucket(DB.getConnection().db, {
      bucketName: 'tracks'
    });

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });

  })
});

module.exports = router;