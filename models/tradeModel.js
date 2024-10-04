// models/tradeModel.js
class Trade {
  constructor(type, symbol, price, quantity, timestamp) {
    this.type = type; // 'buy' or 'sell'
    this.symbol = symbol;
    this.price = price;
    this.quantity = quantity;
    this.timestamp = timestamp;
  }
}

module.exports = Trade;
