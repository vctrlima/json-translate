import * as dotenv from "dotenv";
dotenv.config();

const env = {
  port: process.env.SERVER_PORT || 8080,
  awsRegion: process.env.AWS_REGION,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export default env;
