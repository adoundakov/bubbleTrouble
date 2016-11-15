let stage;
let shape;

document.addEventListener("DOMContentLoaded", () => {
  window.createjs = createjs;
  stage = new createjs.Stage('canvas');

  shape = new createjs.Shape();
  shape.graphics.beginFill('blue').drawRect(0, 0, 120, 120);
  shape.regX = 60;
  shape.regY = 60;
  stage.addChild(shape);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', tick);
  stage.update();
});

function tick () {
  shape.x += (stage.mouseX - shape.x) * 0.1;
  shape.y += (stage.mouseY - shape.y) * 0.1;
  stage.update();
}
