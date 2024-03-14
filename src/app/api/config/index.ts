
  export const port = process.env.PORT;
  export const environment = process.env.NODE_ENV;
  export const apiUrl = process.env.NODE_ENV === "production" 
                        ? process.env.API_PRODUCTION 
                        : process.env.API_DEVELOPMENT;
  
  export const mongodbString = process.env.MONGODB_STRING;

  export const privateSecret = process.env.PRIVATE_SECRET;