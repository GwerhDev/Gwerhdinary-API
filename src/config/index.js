module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  apiUrl: process.env.NODE_ENV === "production" ? process.env.API_PRODUCTION : process.env.API_DEVELOPMENT,

  mongodbString: process.env.MONGODB_STRING,

  privateSecret: process.env.PRIVATE_SECRET,
}