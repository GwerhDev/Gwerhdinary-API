const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema();

module.exports = mongoose.model('Credential', credentialSchema);