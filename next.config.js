/** @type {import('next').NextConfig} */
const nextConfig = {
   distDir: 'build',
   experimental: {
      serverComponentsExternalPackages: ['mongoose'],
   },
   images: {
      domains: ['lh3.googleusercontent.com'],
   },
   webpack(config) {
      config.experiments = {
         ...config.experiments,
         topLevelAwait: true,
      }
      return config
   },
}

module.exports = nextConfig
