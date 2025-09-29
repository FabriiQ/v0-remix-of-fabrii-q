/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [],
  },
  // Configure serverless function size limits
  output: 'standalone',
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '4mb',
    },
    // Optimize package imports
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-slot',
      '@radix-ui/react-select',
      'lucide-react',
    ],
    // Exclude large dependencies from serverless functions
    outputFileTracingExcludes: {
      '*': [
        '**/.cache/**',
        '**/node_modules/!(@vercel/analytics|@vercel/speed-insights)/**',
        '**/public/**',
        '**/scripts/**',
        '**/test/**',
        '**/tests/**',
        '**/__tests__/**',
        '**/cypress/**',
        '**/examples/**',
        '**/docs/**',
        '**/dist/**',
        '**/styles/**',
        '**/types/**',
        '**/utils/**',
      ],
    },
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Exclude node_modules from serverless functions
    if (!isServer) {
      config.externals = [
        ...(config.externals || []),
        {
          fs: 'commonjs fs',
          'fs/promises': 'commonjs fs/promises',
          path: 'commonjs path',
          os: 'commonjs os',
        },
      ];
    }

    // Add file loader for markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};

// Environment-specific configurations
if (process.env.NODE_ENV === 'production') {
  // Optimize production build
  nextConfig.productionBrowserSourceMaps = false;
  nextConfig.optimizeFonts = true;
  nextConfig.compress = true;
  nextConfig.reactStrictMode = false;
  
  // Configure serverless function size limits
  nextConfig.experimental = {
    ...nextConfig.experimental,
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  };
}

export default bundleAnalyzer(nextConfig);
