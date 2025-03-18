/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/landing-page',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
