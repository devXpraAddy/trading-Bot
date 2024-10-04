// services/apiService.js
const axios = require("axios");
const config = require("../config/config");
const logger = require("./loggingService");

async function fetchStockPrice(retries = 3) {
  try {
    const response = await axios.get(config.apiUrl);
    const stockData = response.data;

    // Validate the API response
    if (
      !stockData ||
      !stockData.stock ||
      typeof stockData.stock.price !== "number" ||
      typeof stockData.stock.symbol !== "string"
    ) {
      logger.error(`Invalid API response format: ${JSON.stringify(stockData)}`);
      throw new Error("Invalid API response format");
    }

    return {
      price: stockData.stock.price,
      symbol: stockData.stock.symbol,
    };
  } catch (error) {
    if (retries > 0 && error.code === "ECONNRESET") {
      logger.warn(
        `Fetch failed (ECONNRESET), retrying... (${retries} retries left)`
      );
      await new Promise((res) => setTimeout(res, 1000)); // Wait 1 second before retrying
      return fetchStockPrice(retries - 1);
    } else {
      logger.error(`Error fetching stock price: ${error.message}`);
      throw error;
    }
  }
}

module.exports = { fetchStockPrice };
