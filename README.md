# BubbleTrouble

## Background

BubbleTrouble is a reimagining of the popular eat-or-be-eaten game [agario](www.agar.io), with players roaming around a game board in pursuit of food. A player can absorb food or another player if that bubble is smaller in size. Alternatively, the player can be eaten by bubbles that are bigger in size.

There are many variations of Agario out there, with different twists. This simulation eschews the multiplayer aspect of the game in favor of a more robust  single player experience (like [Osmos](http://www.osmos-game.com/)).

## Functionality and MVP

In BubbleTrouble, players will be able to:

- [ ] Start and pause/play a randomly generated game board.
- [ ] Manipulate initial game state variables (bubble size, number of bubbles, etc.)
- [ ] Choose from 3 preset difficulties (easy, medium, hard)
- [ ] Learn about the implementation of the game though:
  * A production README on the GitHub repo
  * An about section on the actual game page

## Wireframes

BubbleTrouble is designed to be a single page app, without any database. The single screen will have the game viewport, difficulty controls, nav links to relevant pages (GitHub, my LinkedIn), and an About modal.

The difficulty controls consist of 4 buttons: easy, medium, hard, and custom.
Clicking on the custom button will reveal an additional set of controls:
  - Slider to adjust game speed
  - Text box inputs for initial density
  - Slider / Dial for variance in initial side

![link to app wireframe](docs/wireframes/app_overview.png)

## Implementation

BubbleTrouble will be written in basic JavaScript, with the graphical manipulation done through an HTML5 Canvas element. Webpack will also be used to bundle up and serve various scripts needed by the project.

There will be a few helper scripts in this project:
  `board.js`: lightweight script that deals with redrawing board
  `util.js`: contains helper functions to assist in collision calculation etc.
  `ship.js`: handles player bubble movement and growth from absorbing other bubbles
  `bubble.js`: same as `ship.js` but without movement controls

## Development Timeline

**Day 1:** Basic project init, be able to render random array of bubbles to `Canvas` element. Write project skeleton.

**Day 2:** Build out bubble motion and collision detection. Write the `bubble.js` and `util.js` files. Goal by end of day is to have random motion of bubbles with working collisions.

**Day 3:** Add Player movement and begin visual styling of game, end game detection.

**Day 4:** Create visual sections of game. Build out styling and buttons, about page, and modal. Finish lingering ToDo items from Days 1-3. Begin bonus features if time.

## Bonus Features

There are a few bonus features that would add extra visual or gameplay elements, and are worth pursuing:

  - [ ] Different color schemes based on difficulty?
  - [ ] Gameplay overhaul to make it more like Osmos
      * To move you eject bubbles opposite of the direction you want to move, physics moves you around.
  - [ ] Add extra bubble Class (enemies) that have basic AI
      * Chase you if they are bigger, seek food if you are bigger.
  - [ ] Add special bubbles (attract / repulse) to change default behavior of bubbles.
