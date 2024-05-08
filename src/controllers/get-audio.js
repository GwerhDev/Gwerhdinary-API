const router = require("express").Router();
const { getFileUrlFromS3 } = require("../integrations/aws");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = getFileUrlFromS3('audio.mp3', '/audio');

    return res.status(200).send(response);

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
