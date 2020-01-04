export const generateSerial = () => {
  const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const serialLength = 10;

  let randomSerial = '';

  let i;

  let randomNumber;

  for (i = 0; i < serialLength; i += 1) {
    randomNumber = Math.floor(Math.random() * chars.length);

    randomSerial += chars.substring(randomNumber, randomNumber + 1);
  }

  return randomSerial;
};
