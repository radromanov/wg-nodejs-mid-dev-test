# Slot Machine Game Microservices

This project is part of a practical test, and has been built with the intent of satisfying the requirements highlighted in the `requirements.md` file. Said requirements _do not_ specify the need to split the code into microservices, however, I've taken it upon myself to attempt to simulate real-world projects (while staying simplistic and minimalistic, as I do not employ features such as message brokers, databases, authentication, caching, and etc.). I am aware that improvements can be made to both structure and implementation (communication via HTTP which is currently synchronous is one example), although I would like for this project to serve as a preview to what I can accomplish given my current situation, as well as deadlines (despite those same deadlines being more than friendly).

I would be more than happy to receive feedback on the back of this project, as well as areas I can look to improve in or simply research.

## Table of Contents

- [Slot Machine Game Microservices](#slot-machine-game-microservices)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Access the APIs](#access-the-apis)
    - [Testing the Routes](#testing-the-routes)
      - [Example using curl:](#example-using-curl)
  - [Available Routes](#available-routes)
    - [Gateway Routes](#gateway-routes)
  - [Environment Variables](#environment-variables)
  - [License](#license)

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

Each service has its own unique `.env` file, the structure/contents of which are highlighted in a `.env.example` file. Make sure you include your own `.env` file within the root of each directory. More detailed description can be found [here](#environment-variables). Example:

```bash
├── gateway/
|   ├── src/
|   ├── .env.example    # Use this file as a template
|   └── .env            # to fill out this file
└── ...

```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/slot-machine-game.git
   cd slot-machine-game
   ```

2. Build and start the services using Docker Compose:
   ```sh
   docker compose up
   docker compose up -d # To start in detached mode
   ```

This will build and start the following services:

- Gateway service
- Game service
- Wallet service

## Usage

Once the services are up and running, you can access the APIs via the exposed ports.

### Access the APIs

- **Gateway service**: `http://localhost:3000`
- **Game service**: `http://localhost:3001`
- **Wallet service**: `http://localhost:3002`

### Testing the Routes

You can use tools like `curl`, `Postman`, or any HTTP client to test the available routes.

#### Example using curl:

- **Play route**:

  ```sh
  curl -X GET http://localhost:3001/play
  ```

- **Sim route**:

  ```sh
  curl -X GET http://localhost:3001/sim
  ```

- **Deposit to wallet**:

  ```sh
  curl -X POST http://localhost:3002/wallet/deposit -H "Content-Type: application/json" -d '{"amount": 100}'
  ```

- **Withdraw from wallet**:

  ```sh
  curl -X POST http://localhost:3002/wallet/withdraw -H "Content-Type: application/json" -d '{"amount": 50}'
  ```

- **Check wallet balance**:
  ```sh
  curl -X GET http://localhost:3002/wallet/balance
  ```

## Available Routes

### Gateway Routes

- **GET /play**

  - Description: Route to start playing the slot machine game.

- **GET /sim**

  - Description: Route to simulate a game play.

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

## Environment Variables

Please make sure you use `docker compose up` to play around with the project. If using the `package.json` `dev` command, you will have to change the host environment variable, as I have defined a network for the containers to run in within the `docker-compose.yml` file. Make sure to configure the following environment variables in a `.env` file at the root of each service (see `.env.example` or below for more details on the key-value pairs):

- **gateway/.env**

  ```env
  GATEWAY_HOST=http://localhost
  GATEWAY_PORT=3000

  GAME_SERVICE_URL=http://localhost:3001      # When running outside of Docker compose or...
  GAME_SERVICE_URL=http://game:3001           # When using Docker compose
  GAME_SERVICE_PORT=3001
  GAME_SERVICE_URL=http://localhost:3001      # When running outside of Docker compose or...
  GAME_SERVICE_URL=http://game:3001           # When using Docker compose

  WALLET_SERVICE_HOST=http://localhost:3002   # When running outside of Docker compose or...
  WALLET_SERVICE_HOST=http://wallet:3002      # When using Docker compose
  WALLET_SERVICE_PORT=3002
  WALLET_SERVICE_URL=http://localhost:3002    # When running outside of Docker compose or...
  WALLET_SERVICE_URL=http://wallet:3002       # When using Docker compose
  ```

- **game/.env**

  ```env
  GAME_SERVICE_URL=http://localhost:3001 # When running outside of Docker compose or...
  GAME_SERVICE_URL=http://game:3001      # When using Docker compose
  GAME_SERVICE_PORT=3001
  GAME_SERVICE_URL=http://localhost:3001 # When running outside of Docker compose or...
  GAME_SERVICE_URL=http://game:3001      # When using Docker compose
  ```

- **wallet/.env**

  ```env
  WALLET_SERVICE_HOST=http://localhost:3002  # When running outside of Docker compose or...
  WALLET_SERVICE_HOST=http://wallet:3002     # When using Docker compose
  WALLET_SERVICE_PORT=3002
  WALLET_SERVICE_URL=http://localhost:3002   # When running outside of Docker compose or...
  WALLET_SERVICE_URL=http://wallet:3002      # When using Docker compose
  ```

## License

This project is licensed under the ISC License.

```

```
