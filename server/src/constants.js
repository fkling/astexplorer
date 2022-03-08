import logger from "./logger"

if (!process.env.AUTH_TOKEN) {
  logger.error(
    'AUTH_TOKEN is not set! That will result in all gists being anonymous, ' +
    'which is probably not what you want.'
  );
  process.exit(1);
}

export default {
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  SETTINGS_FORMAT: 2,
};
