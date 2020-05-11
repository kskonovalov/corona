/**
 * Function generates random color
 */
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  const color: string[] = [];
  color.push('#');
  for (let i = 0; i < 6; i++) {
    color.push(letters[Math.floor(Math.random() * 16)]);
  }
  return color.join('');
};

export { getRandomColor };

/**
 * Type of data prepared to graph
 */
export type TPreparedData = {
  date: string;
  count: string | number;
};
