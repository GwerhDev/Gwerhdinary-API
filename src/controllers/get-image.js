const express = require('express');
const { Readable } = require('stream');
const imageSchema = require('../models/Image');
const { convertBase64ToBuffer } = require('../utils/convertBase64ToBuffer');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageSchema.findById(id);

    if (!image || !image.image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    const imageBuffer = await convertBase64ToBuffer(image.image);

    const imageStream = new Readable();
    imageStream.push(imageBuffer);
    imageStream.push(null);

    res.setHeader('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
