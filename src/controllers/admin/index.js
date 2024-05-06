const router = require('express').Router();

const audio = require('./audio');

router.use("/a", audio);

module.exports = router;