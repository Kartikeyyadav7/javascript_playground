const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 3
const width = 600
const height = 600


const engine = Engine.create();

const { world } = engine;

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        width,
        height
    }
})

Render.run(render);

Runner.run(Runner.create(), engine)

//Walls 

const walls = [
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
]

World.add(world, walls)

//Maze generation

//Multidimensinal grid , 2d array [[false, false, false], [false,false, false], [false, false, false]]
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false))

//vertical columns 
const vertical = Array(cells).fill(null).map(() => Array(cells - 1).fill(false))

//horizontal columns
const horizontal = Array(cells - 1).fill(null).map(() => Array(cells).fill(false))

