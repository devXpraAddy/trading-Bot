// server.js
const express = require("express");
const app = express();
const prices = require("./data/prices.json");
let index = 0;

app.get("/stock", (req, res) => {
  try {
    if (index >= prices.length) {
      index = 0;
    }
    const stockData = { stock: prices[index] };

    // Validate the price before sending
    if (
      typeof stockData.stock.price !== "number" ||
      stockData.stock.price <= 0
    ) {
      console.error(`Invalid stock price: $${stockData.stock.price}`);
      res.status(500).json({ error: "Invalid stock price" });
      return;
    }

    console.log(`Serving price: $${stockData.stock.price}`);
    index += 1;
    res.json(stockData);
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
