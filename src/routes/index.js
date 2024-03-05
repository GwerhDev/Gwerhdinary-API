const router = require('express').Router();
const getImage = require('../controllers/get-image');

router.use("/i", getImage);

module.exports = router;