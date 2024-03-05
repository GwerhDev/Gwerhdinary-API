module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,

  mongodbString: process.env.MONGODB_STRING,

  privateSecret: process.env.PRIVATE_SECRET,
}