# Slot Machine Game Microservices

This project is part of a practical test, and has been built with the intent of satisfying the requirements highlighted in the `requirements.md` file. Said requirements _do not_ specify the need to split the code into microservices, however, I've taken it upon myself to attempt to simulate real-world projects (while staying simplistic and minimalistic, as I do not employ features such as message brokers, databases, authentication, caching, and etc.).

I am aware that improvements can be made to both structure and implementation (communication via HTTP which is currently synchronous is one example), although I would like for this project to serve as a preview to what I can accomplish given my current situation, as well as deadlines (despite those same deadlines being more than friendly).

For the purpose of ease of installation and usage, I have included the `.env` files within the Git Repository, however, in a real-world example, those would have been kept secret.

I would be more than happy to receive feedback on the back of this project, as well as areas I can look to improve in or simply research.

## Table of Contents

- [Slot Machine Game Microservices](#slot-machine-game-microservices)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Access the APIs](#access-the-apis)
    - [Testing the Routes](#testing-the-routes)
      - [Example using curl](#example-using-curl)
  - [Available Routes](#available-routes)
    - [Gateway Routes](#gateway-routes)
  - [License](#license)

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/radromanov/wg-nodejs-mid-dev-test.git
   cd slot-machine-game
   ```

2. Build and start the services using Docker Compose:

   ```sh
   docker compose up
   docker compose up -d       # To start in detached mode
   docker compose up --build  # If you've changed anything in the project, you have to rebuild the images
   ```

This will build and start the following services:

- Gateway service
- Game service
- Wallet service
- RTP (Return-to-Player) service

## Usage

Once the services are up and running, you can access the APIs via the exposed ports.

### Access the APIs

The below are all available, however, the intent is for all HTTP calls to route through `http://localhost:3000`, so make requests to the gateway.

- **Gateway service**: `http://localhost:3000`
- **Game service**: `http://localhost:3001`
- **Wallet service**: `http://localhost:3002`
- **RTP service**: `http://localhost:3003`

### Testing the Routes

You can use tools like `curl`, `Postman`, or any HTTP client to test the available routes.

#### Example using curl

- **Play route**:

  ```sh
  curl -X POST http://localhost:3000/play -H "Content-Type: application/json" -d '{"bet": 100}'
  ```

- **Sim route**:

  ```sh
  curl -X POST http://localhost:3000/sim -H "Content-Type: application/json" -d '{"bet": 100, "count": 5}'
  ```

- **Deposit to wallet**:

  ```sh
  curl -X POST http://localhost:3000/wallet/deposit -H "Content-Type: application/json" -d '{"amount": 100}'
  ```

- **Withdraw from wallet**:

  ```sh
  curl -X POST http://localhost:3000/wallet/withdraw -H "Content-Type: application/json" -d '{"amount": 50}'
  ```

- **Check wallet balance**:

  ```sh
  curl -X GET http://localhost:3000/wallet/balance
  ```

- **Check RTP (return-to-player)**:

  ```sh
  curl -X GET http://localhost:3000/rtp
  ```

## Available Routes

### Gateway Routes

- **POST /play**

  - Description: Route to start playing the slot machine game.
  - Body Parameters:
    - `bet` (number): Amount to bet.

- **POST /sim**

  - Description: Route to simulate a game play.
  - Body Parameters:
    - `bet` (number): Amount to bet.
    - `count` (number): Amount of spins to perform.

- **POST /wallet/deposit**

  - Description: Route to deposit money into the wallet.
  - Body Parameters:
    - `amount` (number): Amount to deposit.

- **POST /wallet/withdraw**

  - Description: Route to withdraw money from the wallet.
  - Body Parameters:
    - `amount` (number): Amount to withdraw.

- **GET /wallet/balance**

  - Description: Route to check the current wallet balance.

- **GET /rtp**

  - Description: Route to check the return-to-player (total bets vs. total winnings) percent.

## License

This project is licensed under the ISC License.
