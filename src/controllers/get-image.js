const router = require('express').Router();
const Image = require('../models/Image');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'not_found' });
    }

    res.setHeader('Content-Type', 'image/jpeg');
    
    const response = Buffer.from(image.image, 'base64');
    
    return res.send(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;