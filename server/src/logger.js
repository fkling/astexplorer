import winston from "winston"

/**
 * Logger for server. Does not output to any file.
 */
export default winston.createLogger({
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
  