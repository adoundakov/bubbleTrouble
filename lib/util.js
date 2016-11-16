export const randomVel = (max) => {
  let direction = (2 * Math.PI) * Math.random();
  let xVel = Math.sin(direction) * max;
  let yVel = Math.cos(direction) * max;
  return [xVel, yVel];
};

export const randomBlueWhite = () => {
  const COLORS = ["#4390BC", "#68A7CA", "#8DBDD8", "#B2D3E6", "#D8E9F3",
                  "#456789", "#C4D9E4", "#BBD3E0", "#ABC9D9", "#99B4C3"];
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const randomRadius = (min, max) => (
  (Math.random() * max) + min
);

export const distance = (pos1, pos2) => {
  let xDist = Math.pow((pos1[0] - pos2[0]), 2);
  let yDist = Math.pow((pos1[1] - pos2[1]), 2);

  return Math.sqrt(xDist + yDist);
};

export const between = (a,b,num) => (
  a < num && num < b
);

export const wrap = (pos, max) => {
  if (pos < 0) {
    return max - (pos % max);
  } else if (pos > max) {
    return pos % max;
  } else {
    return pos;
  }
};

export const invert = vel => [ -vel[0], -vel[1] ];

export const offset = (pos, vel, rad) => {
  let vSum = Math.abs(vel[0]) + Math.abs(vel[1]);
  let offRad = 1.4 * rad;

  let xOff = -((vel[0] / vSum) * offRad);
  let yOff = -((vel[1] / vSum) * offRad);

  return [pos[0] + xOff, pos[1] + yOff];
};
