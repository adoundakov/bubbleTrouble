# Development README

## Class / File breakdown
  - Util (lib/utils.js)
    - Utility code, especially vector math stuff.
  - MovingObject (lib/moving_object.js)
    - Base class for anything that moves.
    - Most important methods are MovingObject.prototype.move, MovingObject.prototype.draw(ctx), MovingObject.prototype.isCollidedWith(otherMovingObject).
  - Bubble (lib/asteroid.js)
    - Food for player. It inherits from MovingObject.
  - Ship (lib/ship.js)
    - This is you! Another MovingObject subclass.
  - Game (lib/game.js)
    - Holds collections of the food-bubbles and your ship.
    - Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.
    - Game.prototype.draw(ctx) draws the game.
    - Keeps track of dimensions of the space; wraps objects around when they drift off the screen.
  - GameView (lib/game_view.js)
    - Stores a Game instance.
    - Stores a canvas context to draw the game into.
    - Installs key listeners to move the ship and fire bullets.
    - Installs a timer to call Game.prototype.step.
