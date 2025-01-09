# lib

Some common libraries that are used in the project.

- log.js

    This configures the logger to listen for a LOG_LEVEL environment variable.

- OpenTelemetry

    No custom libraries here, just the OpenTelemetry [auto-instrumentation](https://opentelemetry.io/docs/zero-code/js/). Use environment variables to configure the OpenTelemetry SDK. See the [OpenTelemetry SDK Configuration](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/).

- Jaeger

    A collector is set up for local development so that you can see traces in the Jaeger UI. The collector is configured to listen on port 14268. The Jaeger UI is available at <http://localhost:16686>.
