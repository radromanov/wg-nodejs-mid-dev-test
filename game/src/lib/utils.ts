export function rand(upper?: number) {
  if (upper) {
    return Math.floor(Math.random() * upper);
  }

  return Math.floor(Math.random());
}

export function allEqual<T>(arr: T[]) {
  return arr.every((val) => val === arr[0]);
}
