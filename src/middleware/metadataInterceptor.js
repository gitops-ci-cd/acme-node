import grpc from "@grpc/grpc-js";
import { context, propagation } from "@opentelemetry/api";

export const metadataInterceptor = (options, nextCall) => {
  return new grpc.InterceptingCall(nextCall(options), {
    start(metadata, listener, next) {
      const currentContext = context.active();
      const baggage = propagation.getBaggage(currentContext);

      if (baggage) {
        const entries = baggage.getAllEntries();
        const baggageString = entries.map(([key, value]) => `${key}=${value.value}`).join(",");

        metadata.set("baggage", baggageString);
      }

      next(metadata, listener);
    },
  });
};
