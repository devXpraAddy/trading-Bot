// app.js
const config = require("./config/config");
const logger = require("./services/loggingService");
const { fetchStockPrice } = require("./services/apiService");
const TradingBot = require("./services/tradingService");

const bot = new TradingBot();

async function startTrading() {
  try {
    const stockInfo = await fetchStockPrice();
    bot.updatePrice(stockInfo);
  } catch (error) {
    logger.error(`Trading error: ${error.message}`);
  }
}

logger.info("Trading bot started.");
// Set interval to fetch stock prices based on POLL_INTERVAL
const tradingInterval = setInterval(startTrading, config.pollInterval);

// Graceful shutdown
function shutdown() {
  clearInterval(tradingInterval);
  bot.generateReport();
  logger.info("Trading bot stopped.");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  shutdown();
});
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  shutdown();
});
