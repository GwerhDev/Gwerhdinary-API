const router = require("express").Router();
const DB = require("../integrations/mongodb");
const { ObjectId, GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const trackID = new ObjectId(id) || null;

    const bucket = new GridFSBucket(DB.getConnection().db, {
      bucketName: 'tracks'
    });

    const downloadStream = bucket.openDownloadStream(trackID);

    const audioBuffer = [];

    downloadStream.on('data', (chunk) => {
      audioBuffer.push(chunk);
    });

    downloadStream.on('end', () => {
      const audioStream = new Readable();
      audioBuffer.forEach(chunk => audioStream.push(chunk));
      audioStream.push(null);

      res.set("content-type", "audio/mp3");

      audioStream.pipe(res);
    });

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;