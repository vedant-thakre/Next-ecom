/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
  },
};

export default nextConfig;