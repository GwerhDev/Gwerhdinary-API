const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  active: { type: Boolean, required: true },
});

module.exports = mongoose.model('Credential', credentialSchema);