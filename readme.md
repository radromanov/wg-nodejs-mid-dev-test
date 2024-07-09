# Node.js Developer Task

## MAIN TASK:

### Objective:

- [ ] Create an API for simulating a slot casino game with three endpoints.

### Endpoints:

#### 1. POST /play:

- [ ] Executes a random spin.
- [ ] Calculates and returns the final symbol matrix and winnings.

#### 2. POST /sim:

- [ ] Accepts a parameter "count" which specifies the number of spins to simulate.
- [ ] Returns the total profit or loss from the specified number of spins.

#### 3. GET /rtp:

- [ ] Returns the Return to Player (RTP) percentage based on all spins made so far (total bets vs. total winnings).

### Requirements:

#### 1. RNG Integration:

- [x] Integrate an existing Random Number Generator (RNG) library for random selection. (`Random JS` or JavaScript Native `Math.random()`)

#### 2. Slot Game Logic:

- [ ] Operates on a 3x3 matrix.
- [ ] Uses 3 predefined rows of symbols with 5 different symbols.
- [ ] Randomly selects 3 positions using the RNG.
- [ ] Calculates winnings: Each combination of 3 identical symbols in a row wins 5 times the bet.

#### 3. Detailed Functionality:

##### /play:

- [ ] Executes a single random spin, calculates the winnings, and returns the final symbol matrix and winnings.

##### /sim:

- [ ] Accepts a "count" parameter, performs the specified number of spins, and returns the total profit or loss.

##### /rtp:

- [ ] Returns the RTP percentage based on all spins made so far (total bets vs. total winnings).

## BONUS REQUIREMENTS:

### 1. Error Handling:

- [ ] Implement robust error handling for all endpoints.
- [ ] Ensure the API gracefully handles invalid input, such as missing or incorrect parameters.
- [ ] Return appropriate HTTP status codes and error messages.

### 2. Automated Tests:

- [ ] Write automated tests to ensure the correctness of the implemented functionality.
- [ ] Include unit tests for individual components and integration tests for the API endpoints.

### 3. Wallet Logic:

- [ ] Implement a "wallet" system to manage player balances.
- [ ] Add logic to handle deposits and withdrawals.
- [ ] Ensure the balance is correctly updated after each play and simulation.
- [ ] Implement error handling for scenarios such as insufficient balance.

## DETAILED TASK BREAKDOWN:

### MAIN TASK:

#### 1. POST /play:

- [ ] **Request Body:** `{ "bet": number }`
- [ ] **Response:** `{ "matrix": string[][], "winnings": number }`
- [ ] **Functionality:**
  - [ ] Deduct the bet amount from the player's wallet.
  - [x] Perform a random spin using the RNG.
  - [ ] Calculate the winnings based on the final symbol matrix.
  - [ ] Update the player's wallet with the winnings.
  - [ ] Return the final symbol matrix and winnings.

#### 2. POST /sim:

- [ ] **Request Body:** `{ "count": number, "bet": number }`
- [ ] **Response:** `{ "totalWinnings": number, "netResult": number }`
- [ ] **Functionality:**
  - [ ] Deduct the total bet amount (bet \* count) from the player's wallet.
  - [ ] Perform the specified number of spins.
  - [ ] Calculate the total winnings and net result (total winnings - total bet).
  - [ ] Update the player's wallet with the total winnings.
  - [ ] Return the total winnings and net result.

#### 3. GET /rtp:

- [ ] **Response:** `{ "rtp": number }`
- [ ] **Functionality:**
  - [ ] Calculate the RTP percentage based on all spins made so far.
  - [ ] Return the RTP percentage.

### BONUS REQUIREMENTS:

#### 1. Error Handling:

- [ ] Validate request parameters and return `400 Bad Request` for invalid input.
- [ ] Return `500 Internal Server Error` for unexpected errors.
- [ ] Provide meaningful error messages to the client.

#### 2. Automated Tests:

- [ ] Use a testing framework (e.g., Mocha, Jest) to write unit and integration tests.
- [ ] Test individual components such as RNG integration, spin logic, and wallet updates.
- [ ] Test the API endpoints to ensure they return correct responses and handle errors appropriately.

#### 3. Wallet Logic:

- [ ] Implement endpoints for managing the player's wallet:
  - [ ] **POST /wallet/deposit:** Adds funds to the player's wallet.
  - [ ] **POST /wallet/withdraw:** Withdraws funds from the player's wallet.
  - [ ] **GET /wallet/balance:** Returns the current balance.
- [ ] Ensure the wallet balance is updated correctly after each play and simulation.
- [ ] Handle errors such as insufficient balance for a bet or withdrawal.
