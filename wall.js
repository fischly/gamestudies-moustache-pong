

class Walls {
    constructor() {
        this.wallBodies = [];
        this.wallScores = [0, 0, 0, 0];
	}
	
    load() {
        const wallOptions = {
            isStatic: true,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1,
        };
    
        this.wallBodies[0] = Bodies.rectangle(-145, 310, 330, 620, wallOptions); // left
        this.wallBodies[1] = Bodies.rectangle(745, 310, 330, 620, wallOptions); // right
        this.wallBodies[2] = Bodies.rectangle(310, -145, 620, 330, wallOptions); // top
        this.wallBodies[3] = Bodies.rectangle(310, 745, 620, 330, wallOptions); // bottom
    
         World.add(engine.world, this.wallBodies);
	}
	
	renderScores() {
		context.font = '23px Beleren';
		context.fillStyle = 'black';

		context.fillText(this.wallScores[0], 35, 300);
		context.fillText(this.wallScores[1], 550, 300);
		context.fillText(this.wallScores[2], 300, 45);
		context.fillText(this.wallScores[3], 300, 565);

		// unused debug rendering
		/*for (let i = 0; i < 4; i++) {
			context.fillStyle = '#000';
			context.strokeStyle = '#fff';
			context.lineWidth = 2;
			context.beginPath();
			let vertices = this.wallBodies[i].vertices;

			context.moveTo(vertices[0].x, vertices[0].y);

			for (var j = 1; j < vertices.length; j += 1) {
				context.lineTo(vertices[j].x, vertices[j].y);
			}

			context.lineTo(vertices[0].x, vertices[0].y);
			context.fill();
			// context.stroke();
			context.closePath();
		}

		context.lineWidth = 1;
		context.strokeStyle = '#999';
		context.stroke();*/
	}

	getScore() {
		return Math.max(
			this.wallScores[0],
			this.wallScores[1],
			this.wallScores[2],
			this.wallScores[3]
		);
	}
}