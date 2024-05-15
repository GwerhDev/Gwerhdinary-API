const router = require('express').Router();

const admin = require('../controllers/admin');
const subscriber = require('../controllers/subscriber');

const getImage = require('../controllers/get-image');
const getAudio = require('../controllers/get-audio');
const loginInner = require('../controllers/login-inner');
const signupInner = require('../controllers/signup-inner');

router.use("/admin", admin);
router.use("/subscriber", subscriber);

router.use("/i", getImage);
router.use("/a", getAudio);
router.use("/login-inner", loginInner);
router.use("/signup-inner", signupInner);

module.exports = router;