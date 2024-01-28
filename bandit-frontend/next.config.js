module.exports = {
  // https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    domains: ['bandit-test.infura-ipfs.io'],
  },

  async redirects() {
    return [
      {
        source: '/collection/:username',
        destination: '/collection/eth/:username',
        permanent: false,
      },
    ]
  },
}
