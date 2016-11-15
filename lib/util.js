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
