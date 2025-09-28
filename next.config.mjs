/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        '**/.cache/**',
        '**/node_modules/@xenova/**',
        '**/node_modules/onnxruntime-node/**',
        '**/node_modules/onnxruntime-web/**',
        '**/node_modules/onnxruntime-common/**',
      ],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensures server-only modules are not included in client bundles
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
}

// Remove source maps in production
if (process.env.NODE_ENV === 'production') {
  nextConfig.productionBrowserSourceMaps = false;
}

export default nextConfig
