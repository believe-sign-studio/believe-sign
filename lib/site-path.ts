// Next.js embeds NEXT_PUBLIC values at build time for server and client code.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function sitePath(value: string): string {
  if (!basePath || !value.startsWith('/') || value.startsWith('//')) return value;
  if (value === basePath || value.startsWith(`${basePath}/`) || value.startsWith(`${basePath}?`) || value.startsWith(`${basePath}#`)) return value;
  return `${basePath}${value}`;
}
