const router = require("express").Router();
const DB = require("../integrations/mongodb");
const { ObjectId, GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const trackID = new ObjectId(id);

    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    const bucket = new GridFSBucket(DB.getConnection().db, {
      bucketName: 'tracks'
    });

    const downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on('data', chunk => {
      res.write(chunk);
    });
  
    downloadStream.on('error', () => {
      res.sendStatus(404);
    });
  
    downloadStream.on('end', () => {
      res.end();
    });

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;