// services/loggingService.js
const { createLogger, format, transports } = require("winston");
const path = require("path");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(
      (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join("logs", "trading-bot.log") }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join("logs", "exceptions.log") }),
  ],
});

module.exports = logger;
