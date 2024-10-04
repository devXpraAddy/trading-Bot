# Trading Bot Simulation

## Overview

This project simulates a trading bot that automatically buys and sells stocks based on predefined price thresholds. It uses a mock API to fetch stock prices and logs all trading actions and results. The bot is designed to demonstrate automated trading strategies in a controlled environment.

## Features

- **Mock API**: Fetches simulated stock prices from a JSON file.
- **Trading Logic**: Implements a simple strategy - buys stocks when the price drops by 2% or more, and sells when the price increases by 3% or more.
- **Real-time Simulation**: Continuously polls for price updates and makes trading decisions.
- **Logging**: Comprehensive logging of all trading actions, errors, and results.
- **Configurable**: Easy to adjust trading parameters through configuration files.
- **Error Handling**: Robust error handling and graceful shutdown mechanisms.

## Tech Stack

- Node.js
- Express.js (for mock API server)
- Axios (for HTTP requests)
- Winston (for logging)
- Dotenv (for environment variable management)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/trading-bot.git
   ```
2. Navigate to the project directory:
   ```
   cd trading-bot
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   API_URL=http://localhost:3000/stock
   POLL_INTERVAL=5000
   STARTING_BALANCE=10000
   ```

## Usage

1. Start the mock API server:
   ```
   npm run server
   ```
2. In a new terminal, run the trading bot:
   ```
   npm start
   ```
3. The bot will start trading automatically. You can monitor its actions in the console and in the log files.

## Configuration

The bot's behavior can be configured by modifying the following files:

- `.env`: Set the API URL, polling interval, and starting balance.
- `config/config.js`: Loads and parses the environment variables.
- `data/prices.json`: Modify this file to change the simulated stock prices.

## Project Structure

- `app.js`: Main entry point of the application.
- `server.js`: Mock API server.
- `services/`:
  - `apiService.js`: Handles API calls to fetch stock prices.
  - `loggingService.js`: Configures Winston for logging.
  - `tradingService.js`: Contains the main trading logic.
- `models/`:
  - `tradeModel.js`: Defines the Trade class.
- `config/`:
  - `config.js`: Loads configuration from environment variables.
- `data/`:
  - `prices.json`: Contains mock stock price data.
- `logs/`: Directory where log files are stored.

## Logging

The bot generates two types of log files:

1. `logs/trading-bot.log`: Contains all trading actions and general information.
2. `logs/exceptions.log`: Logs any unhandled exceptions.

## Error Handling

The bot includes error handling for various scenarios:

- API connection errors
- Invalid stock price data
- Uncaught exceptions and unhandled rejections

In case of critical errors, the bot will attempt to gracefully shut down and generate a final report.

## Contributing

Contributions to improve the trading bot are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Disclaimer

This trading bot is for educational purposes only. It does not constitute financial advice, and should not be used for actual trading without proper risk assessment and understanding of financial markets.
