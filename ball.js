
class Ball {
    constructor() {
        this.minimumSpeed = 8;
        this.speedUpAmount = 0.0001;
    }

    create(x = 280, y = 100, radius = 10) {
        this.radius = radius;

        this.ballBody = Bodies.circle(x, y, radius, {
            render: {
                fillStyle: 'red',
                strokeStyle: 'black',
                lineWidth: 2
            },
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1,
            force: { x: 0, y: 0.004 }
        });
    }

    addToWorld() {
        World.add(engine.world, this.ballBody);
    }

    render() {
        // handle speed so the ball gets accellerated again if it slows down to much
        this.handleBallSpeed();

        context.fillStyle = 'green';
        context.strokeStyle = 'white';

        context.beginPath();
        context.arc(this.ballBody.position.x, this.ballBody.position.y, this.radius, 0, 2*Math.PI);
        context.fill();
        context.stroke();
        context.closePath();
    }

    handleBallSpeed() {
        if (this.ballBody.speed < this.minimumSpeed) {
            // get velocity vector and normalize it in order to speedup the ball into the direction it was already going
            let normalizedVelocity = Matter.Vector.normalise(this.ballBody.velocity);
            let speedupVec = Matter.Vector.mult(normalizedVelocity, this.speedUpAmount);

            this.ballBody.force = Matter.Vector.add(this.ballBody.force, speedupVec);
        }
    }
}