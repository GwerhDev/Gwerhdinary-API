import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: { type: String, required: false },
});

export const ImageModel = mongoose?.models?.Image || mongoose.model('Image', imageSchema);