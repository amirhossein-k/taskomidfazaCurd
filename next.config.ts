import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images:{
    domains:['reqres.in'],
    remotePatterns:[
      {
        protocol:'https',
        hostname:'reqres.in',
        pathname:'/**'
      }
    ]
  }
};

export default nextConfig;
