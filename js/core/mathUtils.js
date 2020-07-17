/* Linear interpolation */
export const lerp = (a, b, n) => (1 - n) * a + n * b

/* Map values from one range (a-b) to another (c-d) */
export const map = (val, a, b, c, d) => (val - a) * (d - c) / (b - a) + c