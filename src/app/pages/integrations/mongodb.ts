const mongoose = require("mongoose");
const { mongodbString } = require("../config");

export class DB {
  static connect() {
    mongoose.Promise = global.Promise;
    return mongoose.connect(
      mongodbString,
    )
  }
};