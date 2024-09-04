/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
      styledComponents: true,
    },
    env: {
      API_KEY: process.env.API_KEY,
    },
  };

export default nextConfig;
