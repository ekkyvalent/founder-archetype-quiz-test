

const nextConfig = {
  async headers() {
    return [
      {
        // Allow the quiz to be embedded in Webflow via <iframe>
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://aspireapp.com',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://aspireapp.com https://*.aspireapp.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
