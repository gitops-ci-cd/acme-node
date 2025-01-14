// Converted to TypeScript - Add meaningful types below
import { LOG_LEVEL } from "./lib/log.ts";
import app from "./app.ts";

const PORT = process.env.PORT || 8080;

app.listen(PORT, (): any => {
  console.info(`Log level is set to ${LOG_LEVEL}`);
  console.info(`Server is running on port ${PORT}`);
});
