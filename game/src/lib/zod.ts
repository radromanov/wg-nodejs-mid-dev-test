export const required = (name: string) => ({
  required_error: `${name} is required`,
});
export const invalid = (name: string, type: string) => ({
  invalid_type_error: `${name} must be of type ${type}`,
});
export const errors = (name: string, type = "String") => ({
  ...required(name),
  ...invalid(name, type),
});
export const minimum = (name: string, min = 1) =>
  `${name} must be at least ${min} character(s)`;
export const maximum = (name: string, max: number) =>
  `${name} cannot exceed ${max} character(s)`;
