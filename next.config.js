/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domaines autorisés pour les images distantes (flux RSS d'actualités)
    domains: [
      'www.01net.com',
      'c0.lestechnophiles.com',
      'images.unsplash.com',
      'www.numerama.com',
      'www.lemonde.fr',
      'media.lemonde.fr',
      'static.numerama.com',
    ],
  },
};

module.exports = nextConfig;
