import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const protectedRoutes = ['/dashboard', '/events/create', '/events/[^/]+/edit'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isProtectedRoute(pathname: string) {
  // Check if pathname matches any pattern in privatePaths
  const isOnProtectedRoute = protectedRoutes.some((route) => {
    const regexPattern =
      route === '/dashboard' ? `^${route}(/.*)?$` : `^${route}$`;
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });

  return isOnProtectedRoute;
}

export function normalizeUrl(url: string) {
  if (!url.startsWith('http')) return `https://${url}`;

  return url;
}
