const { Engine, Render, Runner, World, Bodies, Body } = Matter;

const cells = 10
const width = 600
const height = 600

const unitLength = width / cells;

const shuffle = arr => {
    let counter = arr.length

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr
}

const engine = Engine.create();

engine.world.gravity.y = 0

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
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
]

World.add(world, walls)

//Maze generation

//Multidimensinal grid , 2d array [[false, false, false], [false,false, false], [false, false, false]]
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false))

//vertical columns 
const vertical = Array(cells).fill(null).map(() => Array(cells - 1).fill(false))

//horizontal columns
const horizontal = Array(cells - 1).fill(null).map(() => Array(cells).fill(false))

const startRow = Math.floor(Math.random() * cells)
const startCol = Math.floor(Math.random() * cells)

const stepThroughCell = (row, column) => {

    // IF I have visited the cells at row, column then return 
    if (grid[row][column]) {
        return;
    }
    //Mark this cell as being visited
    grid[row][column] = true;

    //Assemble randomly ordered list of neighbours
    const neighbours = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
    ])
    //For each neighbour...

    for (let neighbour of neighbours) {

        const [nextRow, nextColumn, direction] = neighbour;

        //See if that neighbour is out of bounds

        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }

        //If we have visited that neighbour , continue to next neighbour
        if (grid[nextRow][nextColumn]) {
            continue;
        }

        //Remove a wall from either horizontals or verticals
        if (direction === 'left') {
            vertical[row][column - 1] = true;
        } else if (direction === 'right') {
            vertical[row][column] = true
        } else if (direction === 'up') {
            horizontal[row - 1][column] = true;
        } else if (direction === 'down') {
            horizontal[row][column] = true;
        }

        //Visit that next cells
        stepThroughCell(nextRow, nextColumn)
    }
}

stepThroughCell(startRow, startCol)

console.log(horizontal)

//We have to figure out where we want to draw the rectangle in the maze for the obstacles

//For drawing the horizontal rectangles 
horizontal.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength / 2,
            rowIndex * unitLength + unitLength,
            unitLength,
            10,
            {
                isStatic: true
            }
        )
        World.add(world, wall)
    })
})

vertical.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength,
            rowIndex * unitLength + unitLength / 2,
            10,
            unitLength,
            {
                isStatic: true
            }
        )
        World.add(world, wall)
    })
})

//Goal

const goal = Bodies.rectangle(
    width - unitLength / 2,
    height - unitLength / 2,
    unitLength * 0.7,
    unitLength * 0.7,
    {
        isStatic: true
    }
)

World.add(world, goal)

//Ball 

const ball = Bodies.circle(
    unitLength / 2,
    unitLength / 2,
    unitLength / 4
)

World.add(world, ball)

document.addEventListener('keypress', event => {
    const { x, y } = ball.velocity;

    if (event.key === 'w') {
        Body.setVelocity(ball, { x, y: y - 5 })
    }

    if (event.key === 'd') {
        Body.setVelocity(ball, { x: x + 5, y })
    }
    if (event.key === 'a') {
        Body.setVelocity(ball, { x: x - 5, y })
    }
    if (event.key === 's') {
        Body.setVelocity(ball, { x, y: y + 5 })
    }

})