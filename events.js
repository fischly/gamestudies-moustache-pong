
// adding and handling physics events here

function registerEvents() {
    // use collisionEnd
    Events.on(engine, 'collisionEnd', function(event) {
        let eventPairs = event.pairs;
        // check if the ball collidet with a wall
        for (let pair of eventPairs) {
            // if (pair.bodyA == ball || pair.bodyB == ball) {
            //     // console.log('BALL COLLIDED XD');
            // }
            // if (pair.bodyA == walls[0] || pair.bodyB == walls[0]) {
            //     console.log('COLLIDED WITH ALL LEFT');
            // }
            // console.log('PAIR bodyA: ', event.pairs[0].bodyA)

            // for (let wallIndex = 0; wallIndex < 4; wallIndex++) {
            if (isWallCollision(pair, 0)) {
                // left
                walls.wallScores[0]++;
                walls.wallScores[1] = 0;
                soundHit.play();
            }
            if (isWallCollision(pair, 1)) {
                // right
                walls.wallScores[1]++;
                walls.wallScores[0] = 0;
                soundHit.play();
            }
            if (isWallCollision(pair, 2)) {
                // top
                walls.wallScores[2]++;
                walls.wallScores[3] = 0;
                soundHit.play();
            }
            if (isWallCollision(pair, 3)) {
                // bottom
                walls.wallScores[3]++;
                walls.wallScores[2] = 0;
                soundHit.play();
            }

            items.handleCollision(pair);
        }
    });
}

// Events.on(engine, 'collisionStart', function(event) {

// });


// helper
function isWallCollision(pair, wallIndex) {
    return pair.bodyA == walls.wallBodies[wallIndex] || pair.bodyB == walls.wallBodies[wallIndex];
}