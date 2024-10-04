// config/config.js
require("dotenv").config();

module.exports = {
  apiUrl: process.env.API_URL,
  pollInterval: parseInt(process.env.POLL_INTERVAL, 10),
  startingBalance: parseFloat(process.env.STARTING_BALANCE),
};
