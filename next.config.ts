import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow cross-origin requests from local network during development
  // Configured to allow requests from local network IP address
  allowedDevOrigins: [
    '192.168.100.10:3000',
    'localhost:3000',
  ],
};

export default nextConfig;
