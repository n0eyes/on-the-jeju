/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "https://naveropenapi.apigw-pub.fin-ntruss.com/:path*",
        source: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
