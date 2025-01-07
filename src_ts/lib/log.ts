enum Levels {
  debug = 0,
  info = 1,
  warn = 2,
  error = 3,
}

const levels = Levels;

export const LOG_LEVEL = process.env.LOG_LEVEL || Object.keys(levels)[levels.info];

const currentLevel = parseInt(levels[LOG_LEVEL.toLowerCase()]);

if (currentLevel > levels.debug) {
  console.debug = (): any => {};
}

if (currentLevel > levels.info) {
  console.info = (): any => {};
}

if (currentLevel > levels.warn) {
  console.warn = (): any => {};
}
