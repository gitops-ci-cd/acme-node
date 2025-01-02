import { context, propagation } from "@opentelemetry/api";

export const makeHTTPRequest = async () => {
  const currentContext = context.active();
  const headers = {};

  // Inject OpenTelemetry context (traceparent, tracestate, and baggage) into headers
  propagation.inject(currentContext, headers);

  console.info("Headers with OTEL context:", headers);

  // Use fetch to make an HTTP request with the injected headers
  const response = await fetch("http://example.com", {
    method: "GET",
    headers,
  });

  await response.text();
};
