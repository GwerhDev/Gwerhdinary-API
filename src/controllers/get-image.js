const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    return res.send(Buffer.from(image.image, 'base64'));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;