const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: { type: String, required: false },
});

export const imageModel = mongoose.model('Image', imageSchema);