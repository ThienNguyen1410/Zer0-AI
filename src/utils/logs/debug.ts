const DEV_ENV = 'development';

/**
 * Debug utility that only logs when NEXT_PUBLIC_DEV_ENV is set to "development"
 */
const isDevelopment = DEV_ENV === 'development';

export const debugLog = (...args: any[]) => {
  if (isDevelopment) {
    console.log(...args);
  }
};

export const debugWarn = (...args: any[]) => {
  if (isDevelopment) {
    console.warn(...args);
  }
};

export const debugError = (...args: any[]) => {
  if (isDevelopment) {
    console.error(...args);
  }
};
