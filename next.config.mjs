/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    FIREBASE_STORAGE_URL: process.env.FIREBASE_STORAGE_URL,
    MONGO_URI: process.env.MONGO_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;