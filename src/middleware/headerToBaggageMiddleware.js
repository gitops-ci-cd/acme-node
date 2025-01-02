import { context, propagation } from "@opentelemetry/api";

export const headerToBaggageMiddleware = (req, _res, next) => {
  const currentContext = context.active();
  const headersToExtract = [
    "x-subdomain",
    "x-request-id",
    "x-person-id",
  ];

  // Build the baggage key-value pairs dynamically
  const baggageEntries = headersToExtract.reduce((entries, header) => {
    const value = req.header(header);
    if (value) {
      entries[header] = { value };
    }
    return entries;
  }, {});

  // Static baggage entries for debugging
  const staticBaggage = {
    debugKey1: { value: "debugValue1" },
    debugKey2: { value: "debugValue2" },
  };

  const newBaggage = propagation.createBaggage({ ...baggageEntries, ...staticBaggage });
  const contextWithBaggage = propagation.setBaggage(currentContext, newBaggage);

  // Run the rest of the middleware within the modified context
  context.with(contextWithBaggage, () => {
    next();
  });
};
