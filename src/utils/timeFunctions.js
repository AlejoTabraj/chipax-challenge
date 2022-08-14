const secondsToString = (ms) => {
  return `${Math.floor(ms / 1000)}s ${ms % 1000}ms`;
};

const inTimeResponse = (start, end) => {
  return Math.floor((end - start) / 1000) < 3;
};

module.exports = {
  secondsToString,
  inTimeResponse,
};
