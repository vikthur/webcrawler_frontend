/**   @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  future: { webpack5: true }
}

module.exports = nextConfig