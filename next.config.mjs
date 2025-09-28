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
  // Configure serverless function size limits
  experimental: {
    outputFileTracingExcludes: {
      // Exclude large dependencies from serverless functions
      '*': [
        '**/.cache/**',
        '**/node_modules/**',
        '**/public/**',
        '**/scripts/**',
        '**/styles/**',
        '**/types/**',
        '**/utils/**',
        '**/test/**',
        '**/tests/**',
        '**/__tests__/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.stories.*',
      ],
    },
    // Enable server actions
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  // Configure API routes
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
  // Webpack configuration
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
    
    // Exclude large modules from client bundles
    config.externals = {
      ...config.externals,
      'fs': 'commonjs fs',
      'path': 'commonjs path',
      'os': 'commonjs os',
    };
    
    return config;
  },
}

// Environment-specific configurations
if (process.env.NODE_ENV === 'production') {
  // Disable source maps in production
  nextConfig.productionBrowserSourceMaps = false;
  
  // Enable output file tracing with exclusions
  nextConfig.output = 'standalone';
  
  // Configure serverless function size limits
  nextConfig.experimental = {
    ...nextConfig.experimental,
    // Increase the serverless function size limit
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  };
}

export default nextConfig
