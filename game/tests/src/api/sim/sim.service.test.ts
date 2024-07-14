import { PlayService } from "@api/play";
import { SimService } from "@api/sim";

describe("Simulation Service", () => {
  let simService: SimService;
  let playService: PlayService;
  const bet = 100;
  const spins = 5;

  beforeEach(() => {
    playService = new PlayService();
    simService = new SimService(playService);
  });

  describe("Method Validation", () => {
    const availableMethods = ["simulate"];

    availableMethods.forEach((method) => {
      it(`should contain ${method} method`, () => {
        expect(simService).toHaveProperty(method);
      });
    });
  });

  describe("Invalid Inputs", () => {
    const invalidInputs: { count: any; bet: any; description: string }[] = [
      { bet: "123", count: 3, description: "'bet' is a string" },
      { bet: -123, count: 3, description: "'bet' is a negative integer" },
      { bet: -123.4, count: 3, description: "'bet' is a negative decimal" },
      { bet: true, count: 3, description: "'bet' is a boolean" },
      { bet: {}, count: 3, description: "'bet' is an object" },
      { bet: undefined, count: 3, description: "'bet' is missing" },
      { bet: null, count: 3, description: "'bet' is missing" },
      { count: "3", bet: 123, description: "'count' is a string" },
      { count: -3, bet: 123, description: "'count' is a negative integer" },
      { count: 3.4, bet: 123, description: "'count' is a positive decimal" },
      { count: -3.4, bet: 123, description: "'count' is a negative decimal" },
      { count: true, bet: 123, description: "'count' is a boolean" },
      { count: {}, bet: 123, description: "'count' is an object" },
      { count: undefined, bet: 123, description: "'count' is missing" },
      { count: null, bet: 123, description: "'count' is missing" },
    ];

    invalidInputs.forEach(({ count, bet, description }) => {
      it(`should throw a 400 if ${description}`, async () => {
        await expect(() => simService.simulate(count, bet)).rejects.toThrow(
          expect.objectContaining({
            status: 400,
          })
        );
      });
    });
  });

  it("should simulate multiple playService.play() calls and calculate net result correctly", async () => {
    // Mock the PlayService methods
    const mockSpin = jest
      .spyOn(playService, "spin")
      .mockImplementation(() => ["A", "B", "C"]);
    const mockPlay = jest
      .spyOn(playService, "play")
      .mockImplementation(async () => ({
        matrix: [
          ["A", "B", "C"],
          ["A", "B", "C"],
          ["A", "B", "C"],
        ],
        winnings: 50,
      }));

    const totalWinnings = await simService.simulate(spins, bet);
    const totalBet = bet * spins;
    const netResult = totalWinnings - totalBet;

    expect(mockSpin).toHaveBeenCalledTimes(spins);
    expect(mockPlay).toHaveBeenCalledTimes(spins);
    expect(totalWinnings).toBe(50 * spins); // Each play() call returns 50 winnings
    expect(netResult).toBe(50 * spins - totalBet);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
