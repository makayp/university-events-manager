import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const protectedRoutes = ['/account', '/event/create', '/event/[^/]+/edit'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isProtectedRoute(pathname: string) {
  // Check if pathname matches any pattern in privatePaths
  const isOnProtectedRoute = protectedRoutes.some((route) => {
    const regexPattern =
      route === '/account' ? `^${route}(/.*)?$` : `^${route}$`;
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });

  return isOnProtectedRoute;
}
