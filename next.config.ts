import type { NextConfig } from 'next';
const preview = process.env.STATIC_PREVIEW === '1';
const config: NextConfig = {
  experimental: { cpus: 1 },
  output: preview ? 'export' : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  images: { unoptimized: preview, formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  async headers() { return preview ? [] : [{ source: '/(.*)', headers: [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
  ] }]; }
};
export default config;
