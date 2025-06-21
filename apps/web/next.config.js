/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
          {
              // matching all API routes
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
    },  
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cms-psi-seven.vercel.app',
          pathname: '/api/media/**',
        },
        {
          protocol: 'https',
          hostname: 'web-zeta-lemon.vercel.app',
          pathname: '/api/media/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/api/media/**',
        },
      ],
      minimumCacheTTL: 60, // Increase cache TTL to reduce requests
    },
  };
export default nextConfig;
