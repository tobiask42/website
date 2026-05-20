// next.config.ts
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // sorgt für stabilere Builds bei Deployments
  generateBuildId: async () => {
    return Date.now().toString();
  },

  // optional, aber gut für Debugging
  productionBrowserSourceMaps: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);