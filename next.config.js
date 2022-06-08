/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
