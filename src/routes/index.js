const router = require('express').Router();
const getImage = require('../controllers/get-image');
const getAudio = require('../controllers/get-audio');


router.use("/i", getImage);
router.use("/a", getAudio);

module.exports = router;