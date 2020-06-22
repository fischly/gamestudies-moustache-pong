
// main file that manages all other isntances and creates physic engine and gameloop

// module aliases for shorter access
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices,
    Events = Matter.Events;


// create the physics engine as global object
var engine = Engine.create();
engine.world.gravity.y = 0;

// var render = Render.create({
//     element: document.body,
//     engine: engine
// });

// canvas and context
var canvas;
var context;

var skyBackground, titleScreen;

// sound effects
var soundHit;

// game objects
var ball;
var moustache;
var walls;
var backgroundEmotes;
var items;

// game state
var startTime;
var gameStarted = false;

// handles all object creation and loading
function create() {
    // load stuff from
    canvas = document.querySelector('#main-canvas');
    context = canvas.getContext('2d');
    // context2 = document.querySelectorAll('canvas')[1].getContext('2d');

    skyBackground = document.querySelector('#sky-background');
    titleScreen = document.querySelector('#titlescreen');

    soundHit = document.querySelector('#wall-hit');
    
    // initalize all needed objects
    ball = new Ball();
    ball.create();

    // moustache = new Moustache(moustacheIndex);
    // moustache.load();
   
    items = new Items();
    items.load();

    walls = new Walls();
    walls.load();

    // backgroundEmotes = new BackgroundEmotes(moustacheIndex);
    // backgroundEmotes.load();

    // register events
    registerEvents();

    // register on click handler
    canvas.onclick = onCanvasClick;

    let backgroundTitlescreen = new Image();
    backgroundTitlescreen.onload = function() {
        context.drawImage(backgroundTitlescreen, 0, 0);
    }
    backgroundTitlescreen.src = './titlescreen.svg';

    let titleBeards = [];
    for (let i = 0; i < 3; i++) {
        let titleBeard = new Image();
        titleBeard.onload = () => {
            let renderX, renderY;
            switch (i) {
                case 0: renderX = 50; break;
                case 1: renderX = 245; break;
                case 2: renderX = 440; break;
            };
            context.drawImage(titleBeard, renderX, 450, 110, 110);
        }
        titleBeard.src = './title_beard_' + i + '.svg';
    }


    Engine.run(engine);
}

function run() {
    moustache.addToWorld();
    ball.addToWorld();
 
    startTime = Date.now();
}

// the main game loop update/render method
function draw() {
    window.requestAnimationFrame(draw);

    // if (!gameStarted) {
    //     context.drawImage(titleScreen, 0, 0);
    //     console.log('lol');
    //     return;
    // }

    // clear background
    context.fillStyle = '#45aaf2'; //backgroundGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(skyBackground, 0, 0, 600, 600);

    backgroundEmotes.render();
    items.render();
    walls.renderScores();
    ball.render();
    moustache.render();
}

create();


// canvas event click handler
function onCanvasClick(ev) {
    // check if clicked on one of the moustache icons
    // WxH = 110x110
    // 1: {50, 450}
    // 1: {245, 450}
    // 1: {440, 450}
    if (!gameStarted) {
        let moustacheIndex = -1;
        // check y position, they all share the same y position
        if (ev.offsetY >= 450 && ev.offsetY <= 560) {
            // first moustache
            if (ev.offsetX >= 50 && ev.offsetX <= 160) {
                moustacheIndex = 1;
                gameStarted = true;
            }

            // second moustache
            if (ev.offsetX >= 245 && ev.offsetX <= 355) {
                moustacheIndex = 2;
                gameStarted = true;
            }

            // third
            if (ev.offsetX >= 440 && ev.offsetX <= 550) {
                moustacheIndex = 3;
                gameStarted = true;
            }
        }

    
        if (gameStarted && moustacheIndex >= 1) {
            moustache = new Moustache(moustacheIndex);
            moustache.load();

            backgroundEmotes = new BackgroundEmotes(moustacheIndex);
            backgroundEmotes.load();

            run();
            draw();
        }
    }
}
