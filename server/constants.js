if (!process.env.AUTH_TOKEN) {
  console.error(
    'AUTH_TOKEN is not set! That will result in all gists being anonymous, ' +
    'which is probably not what you want.'
  );
  process.exit(1);
}

module.exports = {
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  SETTINGS_FORMAT: 2,
};
