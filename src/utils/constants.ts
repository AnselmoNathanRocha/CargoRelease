export const EXPIRATE_IN_MINUTES = Number(import.meta.env.VITE_EXPIRATE_IN_MINUTES) || 5;
export const DEFAULT_PAGE_SIZE = 10;
export const UNLOCK_DURATION = EXPIRATE_IN_MINUTES * 60 * 1000;
