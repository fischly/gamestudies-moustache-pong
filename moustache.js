
class Moustache {
    constructor(moustacheIndex = 2) {
        this.moustacheIndex = moustacheIndex;
        this.currentAngle = 0;
    }

    load() {
        // load moustache texture
        this.moustacheTexture = new Image();

        let tempMoustachePos;
        switch (this.moustacheIndex) {
            case 1: 
                this.moustacheTexture.src = './moustache_1_cropped.svg';
                this.moustachePosition = { x: 300, y: 300 };
                this.moustacheConterOfRotation = { x: 105, y: 19 };
                this.moustacheScale = 1.89;
                this.polygonScale = 4.0;

                // item scalings
                this.scaleUpPolygon = 1.3;
                break;
            case 2:
                this.moustacheTexture.src = './moustache_3_cropped.svg';
                this.moustachePosition = { x: 300, y: 280 };
                this.moustacheConterOfRotation = { x: 98, y: 24 };
                this.moustacheScale = 1.89;
                this.polygonScale = 4.0;

                // item scalings
                this.scaleUpPolygon = 1.2;
            break;
            case 3: 
                this.moustacheTexture.src = './moustache_4_cropped.svg';
                this.moustachePosition = { x: 300, y: 300 };
                this.moustacheConterOfRotation = { x: 60, y: 31 };
                this.moustacheScale = 2.36;
                this.polygonScale = 4.92;

                // item scalings
                this.scaleUpPolygon = 1.3;
                break;
        }

        // load moustache polygon
        let svgElement = document.querySelector(`#moustache${this.moustacheIndex}`).children[1].children[0];
        this.moustacheBody = this.path2body(svgElement);

        Matter.Body.setDensity(this.moustacheBody, 100000);

        // add event listener with closure to have access to "this" reference
        document.onmousemove = (ev) => { this.onMouseMove(ev); };
        document.onclick = (ev) => {
                // if (ev.shiftKey) 
                //     // this.makeBig(2000);
                //     // items.spawnItem(ev.offsetX, ev.offsetY, 14, 0, 10000);

                // else 
                //     // this.makeSmall(2000);
                //     items.spawnItem(ev.offsetX, ev.offsetY, 14, 1, 10000);

            };
    }

    addToWorld() {
        World.add(engine.world, this.moustacheBody);
    }

    render() {
        this.moustacheBody.position = { x: this.moustachePosition.x, y: this.moustachePosition.y }; //{ x: 300, y: 300 };
        this.moustacheBody.angle = this.currentAngle;

        this.drawImageRotated(context, this.moustacheTexture, this.currentAngle,
            this.moustachePosition.x, this.moustachePosition.y, 
            this.moustacheConterOfRotation.x, this.moustacheConterOfRotation.y, 
            this.isBig ? this.moustacheScale * this.scaleUpPolygon : 
            this.isSmall ? this.moustacheScale / this.scaleUpPolygon : this.moustacheScale );

        // debug
        // this.drawImageRotated(context2, this.moustacheTexture, this.currentAngle,
        //         this.moustachePosition.x, this.moustachePosition.y, 
        //         this.moustacheConterOfRotation.x, this.moustacheConterOfRotation.y,
        //         this.isBig ? this.moustacheScale * this.scaleUpPolygon : 
        //         this.isSmall ? this.moustacheScale / this.scaleUpPolygon : this.moustacheScale );
    }

    path2body(svgElement) {
        let vertexSet = [];
        let points = Svg.pathToVertices(svgElement, 2);
        // vertexSet.push(Vertices.scale(points, 0.8, 0.8));
        Vertices.scale(points, this.polygonScale, this.polygonScale, {x: 0, y: 0});
        console.log(points);
    
        let moustache = Bodies.fromVertices(300, 300, Vertices.scale(points, 1.8, 1.8), {
            render: {
                fillStyle: '#556270',
                strokeStyle: '#fff',
                lineWidth: 1
            }, 
            isStatic: false,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1
        }, true);

        return moustache;
    }

    makeBig(time) {
        if (!this.isBig && !this.isSmall && gameStarted) {
            Matter.Body.scale(this.moustacheBody, this.scaleUpPolygon, this.scaleUpPolygon, this.moustachePosition);

            this.isBig = true;

            // reset size after time delay
            window.setTimeout(() => {
                Matter.Body.scale(this.moustacheBody, 1 / this.scaleUpPolygon, 1 / this.scaleUpPolygon, this.moustachePosition);
                
                this.isBig = false;
            }, time);
        }
    }

    makeSmall(time) {
        if (!this.isBig && !this.isSmall && gameStarted) {
            Matter.Body.scale(this.moustacheBody, 1 / this.scaleUpPolygon, 1 / this.scaleUpPolygon, this.moustachePosition);

            this.isSmall = true;

            // reset size after time delay
            window.setTimeout(() => {
                Matter.Body.scale(this.moustacheBody, this.scaleUpPolygon, this.scaleUpPolygon, this.moustachePosition);
                
                this.isSmall = false;
            }, time);
        }
    }

    // events
    onMouseMove(ev) {
        if (Date.now() - startTime < 1000 && !gameStarted)
            return; 

        // calculate vector from the mouse position to the center
        let mVec = { x: ev.offsetX - 300, y: ev.offsetY - 300 };
        mVec = Matter.Vector.normalise(mVec);

        // calculate angle
        this.currentAngle = Matter.Vector.angle({x: 0, y: 0}, mVec);
        this.moustacheBody.angle = this.currentAngle;
    }


    // helper
    drawImageRotated (context, image, angleInRad, positionX, positionY, axisX, axisY, scaling = 1) {
        context.save();
        context.translate(positionX, positionY);
        context.rotate(angleInRad);
        context.scale(scaling, scaling);
        context.drawImage(image, -axisX, -axisY);
        // context.rotate(-angleInRad);
        // context.scale(1, 1);
        // context.translate(-positionX, -positionY);
        context.restore();
    }
}