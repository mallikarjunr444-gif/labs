export default {
  async fetch(request, env) {
    try {
      // Try to serve the static asset directly
      const response = await env.ASSETS.fetch(request);

      // If asset found (not a 404), return it
      if (response.status !== 404) {
        return response;
      }

      // Fallback: serve index.html for SPA client-side routing
      const indexUrl = new URL(request.url);
      indexUrl.pathname = '/index.html';
      return env.ASSETS.fetch(indexUrl.toString());
    } catch (e) {
      // On any error, try serving index.html
      const indexUrl = new URL(request.url);
      indexUrl.pathname = '/index.html';
      return env.ASSETS.fetch(indexUrl.toString());
    }
  },
};
