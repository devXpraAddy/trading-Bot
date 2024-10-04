// services/tradingService.js
const logger = require("./loggingService");
const Trade = require("../models/tradeModel");
const config = require("../config/config");

class TradingBot {
  constructor() {
    this.balance = config.startingBalance;
    this.positions = []; // Holds { symbol, price, quantity }
    this.tradeHistory = [];
    this.lastPrice = null;
    this.initialPrice = null;
    this.symbol = null;
  }

  updatePrice(stockInfo) {
    const { price: currentPrice, symbol } = stockInfo;

    if (this.symbol === null) {
      this.symbol = symbol;
    }

    // Validate the current price
    if (currentPrice <= 0 || currentPrice > 1000000) {
      logger.error(`Invalid price received: $${currentPrice}`);
      return;
    }

    if (this.lastPrice === null) {
      this.lastPrice = currentPrice;
      this.initialPrice = currentPrice;
      logger.info(
        `Initial stock price for ${this.symbol} set at $${currentPrice.toFixed(
          2
        )}`
      );
      return;
    }

    const priceChangePercent =
      ((currentPrice - this.lastPrice) / this.lastPrice) * 100;

    if (priceChangePercent <= -2) {
      this.buyStock(currentPrice);
    } else if (priceChangePercent >= 3 && this.positions.length > 0) {
      this.sellStock(currentPrice);
    }

    this.lastPrice = currentPrice;
  }

  buyStock(price) {
    const maxAffordableQuantity = Math.floor(this.balance / price);
    if (maxAffordableQuantity <= 0) {
      logger.info("Insufficient balance to buy stock.");
      return;
    }

    const quantity = maxAffordableQuantity;
    this.balance -= quantity * price;
    this.positions.push({ symbol: this.symbol, price, quantity });
    const trade = new Trade("buy", this.symbol, price, quantity, new Date());
    this.tradeHistory.push(trade);

    logger.info(
      `Bought ${quantity} shares of ${this.symbol} at $${price.toFixed(
        2
      )} each.`
    );
  }

  sellStock(price) {
    const totalQuantity = this.positions.reduce(
      (sum, pos) => sum + pos.quantity,
      0
    );
    if (totalQuantity <= 0) {
      logger.info("No stock positions to sell.");
      return;
    }

    this.balance += totalQuantity * price;
    const trade = new Trade(
      "sell",
      this.symbol,
      price,
      totalQuantity,
      new Date()
    );
    this.tradeHistory.push(trade);
    this.positions = [];

    logger.info(
      `Sold ${totalQuantity} shares of ${this.symbol} at $${price.toFixed(
        2
      )} each.`
    );
  }

  calculateProfitLoss() {
    const totalInvested = this.tradeHistory
      .filter((trade) => trade.type === "buy")
      .reduce((sum, trade) => sum + trade.price * trade.quantity, 0);

    const totalReturns = this.tradeHistory
      .filter((trade) => trade.type === "sell")
      .reduce((sum, trade) => sum + trade.price * trade.quantity, 0);

    const profitLoss = totalReturns - totalInvested;
    return profitLoss;
  }

  generateReport() {
    logger.info("Generating Trading Report...");
    this.tradeHistory.forEach((trade) => {
      logger.info(
        `${trade.type.toUpperCase()} - ${trade.symbol} - Quantity: ${
          trade.quantity
        }, Price: $${trade.price.toFixed(2)}, Time: ${trade.timestamp}`
      );
    });

    const profitLoss = this.calculateProfitLoss();
    logger.info(`Total Profit/Loss: $${profitLoss.toFixed(2)}`);
    logger.info(`Final Balance: $${this.balance.toFixed(2)}`);
  }
}

module.exports = TradingBot;
