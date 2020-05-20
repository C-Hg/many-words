// we want 6 figures without a 0 at the leftmost position
const MAX = 999999;
const MIN = 100000;

/**
 * Produces a 6 figures long totp
 */
const generateTotp = (): number => {
  const randomNumber = Math.floor(Math.random() * (MAX - MIN) + MIN);
  return randomNumber;
};

export default generateTotp;
