import { app } from "@api/app";
import { WalletService } from "@api/wallet";
import { ROUTES } from "@lib/constants";
import request from "supertest";

describe(ROUTES.WALLET, () => {
  const endpoints = app.endpoints();
  const walletService = new WalletService();
  const getCurrentBalance = async () =>
    (await (
      await request(endpoints).get(`${ROUTES.WALLET}/${ROUTES.BALANCE}`)
    ).body.currentBalance) as number;

  describe(ROUTES.BALANCE, () => {
    const endpoint = `${ROUTES.WALLET}/${ROUTES.BALANCE}`;

    describe("Method Validation", () => {
      const invalidMethods = ["post", "put", "patch", "delete"] as const;

      invalidMethods.forEach((method) => {
        it(`should respond with 405 for ${method.toUpperCase()} method`, async () =>
          await request(endpoints)[method](endpoint).expect(405));
      });
    });

    describe("GET /", () => {
      it("should return current balance and respond with 200", async () => {
        const response = await request(endpoints).get(endpoint).expect(200);

        expect(response.body).toHaveProperty("currentBalance");
        expect(typeof response.body.currentBalance).toBe("number");
      });
    });

    describe("OPTIONS /", () => {
      it("should respond with 204 and allow POST and OPTIONS methods", async () => {
        const response = await request(endpoints).options(endpoint).expect(204);

        const allowedMethods = response.headers["access-control-allow-methods"];
        expect(allowedMethods).toContain("GET");
        expect(allowedMethods).toContain("OPTIONS");
      });
    });
  });

  describe(ROUTES.DEPOSIT, () => {
    const endpoint = `${ROUTES.WALLET}/${ROUTES.DEPOSIT}`;

    describe("Method Validation", () => {
      const invalidMethods = ["get", "put", "patch", "delete"] as const;

      invalidMethods.forEach((method) => {
        it(`should respond with 405 for ${method.toUpperCase()} method`, async () =>
          await request(endpoints)[method](endpoint).expect(405));
      });
    });

    describe("POST /", () => {
      let starterBalance: number;

      beforeEach(async () => {
        starterBalance = await getCurrentBalance();
      });

      describe("Invalid Inputs", () => {
        const invalidDepositAmounts = [
          { amount: -1000, description: "'amount' is a negative integer" },
          { amount: -1000.5, description: "'amount' is a negative decimal" },
          { amount: "1000", description: "'amount' is a string" },
          { amount: true, description: "'amount' is a boolean" },
          { amount: {}, description: "'amount' is an object" },
          { amount: undefined, description: "'amount' is missing" },
        ];

        invalidDepositAmounts.forEach(({ amount, description }) => {
          it(`should respond with 400 if ${description}`, async () =>
            await request(endpoints)
              .post(endpoint)
              .send({ amount })
              .expect(400));
        });
      });

      describe("Valid Inputs", () => {
        const validDepositAmounts = [
          { amount: 100, description: "'amount' is a positive integer" },
          { amount: 100.5, description: "'amount' is a positive decimal" },
        ];

        validDepositAmounts.forEach(({ amount, description }) => {
          it(`should respond with 200 if ${description} and deposit funds to the player's wallet`, async () => {
            await request(endpoints)
              .post(endpoint)
              .send({ amount })
              .expect(200);
            const currentBalance = await getCurrentBalance();

            expect(currentBalance).toBe(starterBalance + amount);
          });
        });
      });
    });

    describe("OPTIONS /", () => {
      it("should respond with 204 and allow POST and OPTIONS methods", async () => {
        const response = await request(endpoints).options(endpoint).expect(204);

        const allowedMethods = response.headers["access-control-allow-methods"];
        expect(allowedMethods).toContain("POST");
        expect(allowedMethods).toContain("OPTIONS");
      });
    });
  });

  describe(ROUTES.WITHDRAW, () => {
    const endpoint = `${ROUTES.WALLET}/${ROUTES.WITHDRAW}`;

    describe("Method Validation", () => {
      const invalidMethods = ["get", "put", "patch", "delete"] as const;

      invalidMethods.forEach((method) => {
        it(`should respond with 405 for ${method.toUpperCase()} method`, async () =>
          await request(endpoints)[method](endpoint).expect(405));
      });
    });

    describe("POST /", () => {
      let starterBalance: number;

      beforeEach(async () => {
        starterBalance = await getCurrentBalance();
        walletService.deposit(starterBalance); // Ensure starting balance is sufficient
      });

      describe("Invalid Inputs", () => {
        const invalidWithdrawAmounts = [
          { amount: -1000, description: "'amount' is a negative integer" },
          { amount: -1000.5, description: "'amount' is a negative decimal" },
          { amount: "1000", description: "'amount' is a string" },
          { amount: true, description: "'amount' is a boolean" },
          { amount: {}, description: "'amount' is an object" },
          { amount: undefined, description: "'amount' is missing" },
        ];

        invalidWithdrawAmounts.forEach(({ amount, description }) => {
          it(`should respond with 400 if ${description}`, async () =>
            await request(endpoints)
              .post(endpoint)
              .send({ amount })
              .expect(400));
        });
      });

      describe("Valid Inputs", () => {
        const validWithdrawAmounts = [
          { amount: 100, description: "'amount' is a positive integer" },
          { amount: 100.5, description: "'amount' is a positive decimal" },
        ];

        validWithdrawAmounts.forEach(({ amount, description }) => {
          it(`should respond with 200 if ${description} and withdraw funds from the player's wallet`, async () => {
            await request(endpoints)
              .post(endpoint)
              .send({ amount })
              .expect(200);

            const currentBalance = await getCurrentBalance();
            expect(currentBalance).toBe(starterBalance - amount);
          });
        });
      });
    });

    describe("OPTIONS /", () => {
      it("should respond with 204 and allow POST and OPTIONS methods", async () => {
        const response = await request(endpoints).options(endpoint).expect(204);

        const allowedMethods = response.headers["access-control-allow-methods"];
        expect(allowedMethods).toContain("POST");
        expect(allowedMethods).toContain("OPTIONS");
      });
    });
  });
});
