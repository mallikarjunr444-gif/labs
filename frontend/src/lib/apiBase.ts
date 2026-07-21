const normalizeTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  let baseUrl = configuredUrl;

  if (!baseUrl) {
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
      baseUrl = '/api';
    } else {
      baseUrl = 'https://labs-cl13.onrender.com';
    }
  }

  const normalizedUrl = normalizeTrailingSlash(baseUrl);
  return normalizedUrl.endsWith('/api') ? normalizedUrl : `${normalizedUrl}/api`;
};

