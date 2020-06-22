
class Items {
    // item types (for now):
    // - [0] grow bat 
    // - [1] shrink bat
    // - [2,3] speedup/slow down ball?
    constructor() {
        this.itemTextures = [];
        this.shownItems = [];

        this.lastDespawn = Date.now();
        this.minSpawnTime = 8000;
        this.maxSpawnTime = 20000;

        // 1 in 'spawnChance'
        this.spawnChance = 100;
    }

    load() {
        this.itemTextures[0] = new Image();
        this.itemTextures[1] = new Image();
        this.itemTextures[0].src = './items/grow_bat.svg';
        this.itemTextures[1].src = './items/shrink_bat.svg';
    }

    render() {
        const currentTime = Date.now();
        for (let item of this.shownItems) {
            // check lifetime
            if (currentTime > item.addedAt + item.lifetime) {
                this.removeItem(item);
            }

            context.drawImage(this.itemTextures[item.type], item.x - item.radius, item.y - item.radius, item.radius * 2, item.radius * 2);
        }

        if (currentTime > this.lastDespawn + this.minSpawnTime && this.shownItems.length <= 0) {
            let rnd = Math.random() * this.spawnChance;
            if (rnd <= 1) {
                this.spawnRandom();
            }
        }
    }

    spawnItem(x, y, type, radius=14, lifetime=12000) {
        let itemBody = this.createItemBody(x, y, radius);

        this.shownItems.push({
            x: x,
            y: y,
            radius: radius,
            type,
            lifetime: lifetime,
            addedAt: Date.now(),
            body: itemBody
        });

        World.add(engine.world, itemBody);

        console.log('spawned item at ', x, '/', y, 'with radius', radius, 'of type', type);
    }

    handleCollision(collisionPair) {
        for (let item of this.shownItems) {
            if (collisionPair.bodyA == item.body || collisionPair.bodyB == item.body) {
                console.log('item collidide');

                this.activateEffect(item);
                this.removeItem(item);
            }
        }
    }

    // private
    createItemBody(x, y, radius) {
        let itemBody = Bodies.circle(x, y, radius, {
            render: {
                fillStyle: 'red',
                strokeStyle: 'black',
                lineWidth: 2
            },
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1,
            isStatic: true
        });

        return itemBody;
    }

    removeItem(item) {
        const indexToRemove = this.shownItems.indexOf(item);
        if (indexToRemove > -1) {
            console.info('removing item', item);
            console.log(this.shownItems.length);
            this.shownItems.splice(indexToRemove, 1);
            console.log(this.shownItems.length);
        } else {
            console.warn('could not remove item since indexOf returned -1');
        }

        Composite.remove(engine.world, item.body);

        this.lastDespawn = Date.now();
    }

    activateEffect(item) {
        switch (item.type) {
            case 0: // grow bat
                moustache.makeBig(5000);
                break;
            case 1: // shrink bat
                moustache.makeSmall(5000);
                break;
        }
    }

    spawnRandom() {
        let minX, maxX;
        let minY, maxY;

        let rng1 = Math.random();
        if (rng1 > 0.75) {
            minX = 40; maxX = 80;
            minY = 40; maxY = 570;
        } else if (rng1 > 0.5) {
            minX = 520; maxX = 570;
            minY = 40; maxY = 570;
        }
        else if (rng > 0.25) {
            minX = 40; maxX = 570;
            minY = 40; maxY = 80;
        } else {
            minX = 40; maxX = 570;
            minY = 520; maxY = 570;
        }

        const randX = Math.random() * (maxX - minX) + minX;
        const randY = Math.random() * (maxY - minY) + minY;
        
        this.spawnItem(randX, randY, Math.random() >= 0.5 ? 1 : 0);


    
    }
}