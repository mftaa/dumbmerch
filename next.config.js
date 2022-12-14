/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: "https://dev-dumbmarchyuj1u.microgen.id/graphql", // Belum diganti
    WS_URL: "wss://dev-dumbmarchyuj1u.microgen.id/graphql", // Belum diganti
  },
  images: {
    domains: ["file.mejik.id"], // belum diganti
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
