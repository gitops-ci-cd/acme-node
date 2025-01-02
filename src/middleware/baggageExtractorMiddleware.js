import { context, propagation } from "@opentelemetry/api";

export const baggageExtractorMiddleware = (req, _res, next) => {
  const currentContext = context.active();

  console.debug("Headers received:", req.headers);

  const baggage = propagation.getBaggage(
    propagation.extract(context.active(), req.headers)
  );

  const contextWithBaggage = propagation.setBaggage(currentContext, baggage);

  // Run the rest of the middleware within the modified context
  context.with(contextWithBaggage, () => {
    next();
  });
};
