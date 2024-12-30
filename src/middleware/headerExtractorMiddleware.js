import { asyncLocalStorage } from "../lib/asyncStorage.js";

export const headerExtractorMiddleware = (req, _res, next) => {
  const headersToExtract = [
    "x-subdomain",
    "x-request-id",
    "x-person-id",
  ];

  // Create a new context for the request
  asyncLocalStorage.run(new Map(), () => {
    const store = asyncLocalStorage.getStore();

    headersToExtract.forEach((header) => {
      const value = req.header(header);
      if (value) {
        store.set(header, value);
      }
    });

    next();
  });
};
