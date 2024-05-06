const router = require('express').Router();

const admin = require('../controllers/admin');

const getImage = require('../controllers/get-image');
const getAudio = require('../controllers/get-audio');

router.use("/admin", admin);

router.use("/i", getImage);
router.use("/a", getAudio);

module.exports = router;