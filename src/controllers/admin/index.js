const router = require('express').Router();

const file = require('./management-file');
const credential = require('./management-credential');

router.use("/f", file);
router.use("/credential", credential);

module.exports = router;