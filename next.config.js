/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
// };

// const image = {
//   domains: ["image.unsplash.com"],
// };

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};
