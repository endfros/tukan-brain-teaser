const handleDecimals = (value) => {
  if (value < 0) {
    setDecimals(0);
  } else if (value === null) {
    setDecimals(0);
  } else {
    setDecimals(Number(value));
  }
};

export default handleDecimals;
