const winston = require("winston")

/**
 * Logger for server. Does not output to any file.
 */
module.exports = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.simple()
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	]
});
  