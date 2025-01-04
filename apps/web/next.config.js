/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cms-psi-seven.vercel.app/',
          pathname: '/api/media/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/api/media/**',
        },
      ],
    },
  };
export default nextConfig;
