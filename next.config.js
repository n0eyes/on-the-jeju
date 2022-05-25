/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination:
          "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode:path*",
        source: "/example/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
