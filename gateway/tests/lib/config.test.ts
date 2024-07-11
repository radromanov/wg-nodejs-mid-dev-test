import { Config } from "@core/Config";

// Mock the environment variables
const mockEnv = (env: NodeJS.ProcessEnv) => {
  process.env = { ...env };
};

describe("Config Class", () => {
  beforeEach(() => {
    jest.resetModules(); // Clear the module registry before each test
  });

  it("should correctly parse and return all configuration values", () => {
    mockEnv({
      GATEWAY_HOST: "localhost",
      GATEWAY_PORT: "3000",
      NODE_ENV: "development",
    });

    const config = new Config();
    const allConfig = config.get();

    expect(allConfig).toEqual({
      host: "localhost",
      port: 3000,
      env: "development",
    });
  });

  it("should correctly parse and return a specific configuration value", () => {
    mockEnv({
      GATEWAY_HOST: "localhost",
      GATEWAY_PORT: "3000",
      NODE_ENV: "development",
    });

    const config = new Config();
    expect(config.get("port")).toBe(3000);
    expect(config.get("env")).toBe("development");
  });

  it("should throw an error if required environment variables are missing", () => {
    mockEnv({});

    const config = new Config();
    expect(() => config.get()).toThrow(
      "Internal Server Error - could not initialize gateway."
    );
  });

  it("should throw an error if environment variables do not meet minimum length requirements", () => {
    mockEnv({
      GATEWAY_HOST: "loc",
      GATEWAY_PORT: "3",
      NODE_ENV: "development",
    });

    const config = new Config();
    expect(() => config.get()).toThrow(
      "Internal Server Error - could not initialize gateway."
    );
  });

  it("should throw an error if NODE_ENV is not one of the allowed values", () => {
    mockEnv({
      GATEWAY_HOST: "localhost",
      GATEWAY_PORT: "3000",
      NODE_ENV: "invalid_env",
    });

    const config = new Config();
    expect(() => config.get()).toThrow(
      "Internal Server Error - could not initialize gateway."
    );
  });
});
