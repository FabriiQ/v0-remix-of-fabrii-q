// Force this route to be deployed as a separate serverless function
// This helps keep the function size within limits
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  // Configure this as a separate lambda function
  // This helps with cold starts and size limits
  // Note: This is a Vercel-specific configuration
  runtime: 'nodejs',
  memory: 3008, // 3GB of memory
  maxDuration: 60, // 60 seconds max duration
};
