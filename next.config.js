/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'img.reservoir.tools',
        pathname: '**',
  },{
    protocol: 'https',
    hostname: 'blur.io',
    pathname: '**',
},
],
}
}

module.exports = nextConfig;
