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

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function truncateText(text: string, length: number) {
  if (text.length > 30) return text.substring(0, length) + '...';
  return text;
}

export function copyText(text: string) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
}

export function checkFileSize(file: File) {
  if (!file || !file.type.startsWith('image/')) {
    console.error('File is not an image');
    return;
  }

  // Get the file size in bytes
  const fileSizeInBytes = file.size;

  // Convert to kilobytes and megabytes
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  return fileSizeInMB;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
