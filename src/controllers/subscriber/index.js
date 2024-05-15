const router = require('express').Router();

const file = require('./management-file');

router.use("/file", file);

module.exports = router;