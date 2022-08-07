/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.arweave.net", "arweave.net", "cloudflare-ipfs.com", "testlaunchmynft.mypinata.cloud"],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  async redirects() {
    return [
      // {
      //   source: "/staking",
      //   destination: "/",
      //   permanent: false,
      // },
      {
        source: "/leaderboard",
        destination: "/",
        permanent: false,
      },
      {
        source: "/tributes",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

if (process.env.NODE_ENV === "development") {
  nextConfig.images.domains.push("i.imgur.com");
}

module.exports = nextConfig;
