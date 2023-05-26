const COOKIE_PREFIX = "test-";

/**
 * Set a value for a cookie key
 * @param key cookie key in the app
 * @param value cookie value in json
 * @param expires expiration in day
 */
const setCookie = (key: string, value: string, expires: number) => {
  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + expires * 24 * 60 * 60 * 1000);

  document.cookie = `${COOKIE_PREFIX}${key}=${value}; expires=${expiresAt.toUTCString()}; secure; SameSite=strict; path=/`;
};

/**
 * Get a cookie key value
 * @param key
 */
const getCookie = (key: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_PREFIX}${key}=`))
    ?.split("=")[1];

/**
 * Check if a cookie exists
 * @param key
 */
const hasCookie = (key: string) =>
  document.cookie
    .split(";")
    .some((item) => item.trim().startsWith(`${COOKIE_PREFIX}${key}=`));

/**
 * Remove a cookie key
 * @param key
 */
const removeCookie = (key: string) => setCookie(key, " ", 1);

export { setCookie, getCookie, hasCookie, removeCookie };
