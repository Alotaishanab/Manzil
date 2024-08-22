export const convertCardNumberToMaskDigit = (str: any) => {
  const lastFourDigits = str.slice(-4);
  const maskedDigits = str.slice(0, -4).replace(/./g, '*');
  return `${maskedDigits}${lastFourDigits}`;
};
