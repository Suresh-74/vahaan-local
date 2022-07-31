import dotenv from "dotenv";
dotenv.config({ slient: true });

const {PORT, NODE_ENVIRONMENT, DATABASE, AWS_KEY_ID, AWS_SECRET_KEY_ACCESS, AWS_BUCKET,
AWS_REGION, JWT_TOKEN_KEY} = process.env;

export const PRODUCTION_ENV = "production";
export const DEVELOPMENT_ENV = "development";

// Environments
export const environments = NODE_ENVIRONMENT || DEVELOPMENT_ENV;



// AWS Settings
export const awsRegion = AWS_REGION || "ap-south-1";
export const awsAccessKeyId = AWS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_KEY_ACCESS;
export const awsBucketName = AWS_BUCKET;

// JWT Token 

export const TOKEN_KEY = JWT_TOKEN_KEY;


// port

export const port = PORT;
