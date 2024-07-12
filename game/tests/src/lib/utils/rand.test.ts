import { rand } from "@lib/utils";
import _random from "lodash/random";

jest.mock("lodash/random", () => jest.fn());

describe("rand function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a random number using lodash without arguments", () => {
    (_random as jest.Mock).mockReturnValueOnce(42);

    const result = rand();

    expect(result).toBe(42);
    expect(_random).toHaveBeenCalledTimes(1);
    expect(_random).toHaveBeenCalledWith(0);
  });

  it("should generate a random number using lodash with only upper bound", () => {
    (_random as jest.Mock).mockReturnValueOnce(5);

    const result = rand(0, 10);

    expect(result).toBe(5);
    expect(_random).toHaveBeenCalledTimes(1);
    expect(_random).toHaveBeenCalledWith(0, 9);
  });

  it("should generate a random number using lodash with both lower and upper bounds", () => {
    (_random as jest.Mock).mockReturnValueOnce(7);

    const result = rand(5, 10);

    expect(result).toBe(7);
    expect(_random).toHaveBeenCalledTimes(1);
    expect(_random).toHaveBeenCalledWith(5, 9);
  });
});
