import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias['@components'] = join(__dirname, 'app/components/*');
    config.resolve.alias['@constants'] = join(__dirname, 'app/constants/*');
    config.resolve.alias['@hooks'] = join(__dirname, 'app/hooks/*');
    config.resolve.alias['@store'] = join(__dirname, 'app/store/*');
    config.resolve.alias['@styles'] = join(__dirname, 'app/styles/*');
    config.resolve.alias['@types'] = join(__dirname, 'app/types/*');
    config.resolve.alias['@utils'] = join(__dirname, 'app/utils/*');

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
