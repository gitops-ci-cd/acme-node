// import http from "http";
// import { propagation } from "@opentelemetry/api";

// export const makeHTTPRequest = async () => {
//   console.info(propagation.getActiveBaggage());

//   const options = {
//     hostname: "example.com",
//     port: 80,
//     path: "/",
//     method: "GET",
//   };

//   // Auto-instrumentation handles context injection automatically
//   const req = http.request(options, (res) => {
//     let data = "";

//     res.on("data", (chunk) => {
//       data += chunk;
//     });

//     res.on("end", () => {
//       console.info("Response:", data);
//     });
//   });

//   req.on("error", (error) => {
//     console.error("Error with HTTP request:", error);
//   });

//   req.end();
// };


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
