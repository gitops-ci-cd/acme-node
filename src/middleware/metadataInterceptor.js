import grpc from "@grpc/grpc-js";

import { asyncLocalStorage } from "../lib/asyncStorage.js";

const metadataInterceptor = (options, nextCall) => {
  return new grpc.InterceptingCall(nextCall(options), {
    start(metadata, listener, next) {
      const store = asyncLocalStorage.getStore();

      if (store) {
        for (const [key, value] of store.entries()) {
          metadata.set(key, value);
        }
      };

      next(metadata, listener);
    },
  });
};

export default metadataInterceptor;
