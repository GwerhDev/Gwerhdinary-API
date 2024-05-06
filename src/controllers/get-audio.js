const router = require("express").Router();
const { getFileUrlFromS3 } = require("../integrations/aws");
const DB = require("../integrations/mongodb");
const { ObjectId, GridFSBucket } = require('mongodb');

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await getFileUrlFromS3('audio.mp3', '/audio');

    return res.status(200).send(response);

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
