const round = (num, places) => {
  return +(Math.round(num + "e+" + places) + "e-" + places);
};

export default round;
