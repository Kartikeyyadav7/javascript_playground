const chokidar = require('chokidar')
const debounce = require("lodash.debounce")

const start = debounce(() => {
    console.log("STARTING Users code")
}, 100)

chokidar.watch('.')
    .on('add', start)
    .on("change", () => console.log("FILE Changed"))
    .on("unlink", () => console.log("FILE Deleted"))