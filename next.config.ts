import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  typescript: {
    ignoreBuildErrors: true,
  } as any,
};

export default nextConfig;
