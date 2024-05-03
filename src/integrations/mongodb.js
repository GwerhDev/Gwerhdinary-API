const mongoose = require("mongoose");
const { mongodbString } = require("../config");

module.exports = class DB {
  static connect() {
    mongoose.Promise = global.Promise;
    return mongoose.connect(
      mongodbString,
    )
  };

  static async uploadAudio(name, buffer) {
    try {
      const audio = new audioSchema({ name, data: buffer });
      const result = await audio.save();
      return result._id;
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  };

  static getConnection() {
    return mongoose.connection;
  };
};
