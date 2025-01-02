import { LOG_LEVEL } from "./lib/log.js";
import app from "./app.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.info(`Log level is set to ${LOG_LEVEL}`);
  console.info(`Server is running on port ${PORT}`);
});
