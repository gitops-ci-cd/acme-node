const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export const LOG_LEVEL = process.env.LOG_LEVEL || Object.keys(levels)[levels.info];

const currentLevel = levels[LOG_LEVEL.toLowerCase()] || levels.info;

if (currentLevel > levels.debug) {
  console.debug = () => {};
}

if (currentLevel > levels.info) {
  console.info = () => {};
}

if (currentLevel > levels.warn) {
  console.warn = () => {};
}
