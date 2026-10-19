export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const cleanPath = url.pathname.replace(/\/$/, '');

      // 1. Try to serve the static asset directly
      let response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }

      // 2. If clean URL requested (e.g. /blog/acne or /analysis), check for pre-rendered pages
      if (cleanPath && cleanPath !== '') {
        // Try directory index: /blog/acne/index.html
        const dirIndexUrl = new URL(request.url);
        dirIndexUrl.pathname = cleanPath + '/index.html';
        response = await env.ASSETS.fetch(dirIndexUrl.toString());
        if (response.status !== 404) {
          return response;
        }

        // Try static html file: /blog/acne.html
        const fileUrl = new URL(request.url);
        fileUrl.pathname = cleanPath + '.html';
        response = await env.ASSETS.fetch(fileUrl.toString());
        if (response.status !== 404) {
          return response;
        }
      }

      // 3. Fallback: serve root /index.html for SPA client-side routing
      const indexUrl = new URL(request.url);
      indexUrl.pathname = '/index.html';
      return env.ASSETS.fetch(indexUrl.toString());
    } catch (e) {
      // On any error, serve root index.html
      const indexUrl = new URL(request.url);
      indexUrl.pathname = '/index.html';
      return env.ASSETS.fetch(indexUrl.toString());
    }
  },
};
