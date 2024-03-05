const router = require('express').Router();
const imageSchema = require('../models/Image');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageSchema.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'not_found' });
    }
    
    const response = Buffer.from(image.image, 'base64');
    
    res.setHeader('Content-Type', 'image/jpeg');
    return res.send(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;