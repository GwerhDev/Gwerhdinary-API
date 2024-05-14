const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).send("Soon...");

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
