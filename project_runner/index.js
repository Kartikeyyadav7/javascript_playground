const chokidar = require('chokidar')
const debounce = require("lodash.debounce")
const program = require('caporal')
const fs = require('fs')

program
    .version('0.0.1')
    .argument('[filename]', "Name of the file to run")
    .action(async ({ filename }) => {
        const name = filename || "index.js";

        try {
            await fs.promises.access(name)
        } catch (err) {
            throw new Error(`Couldn't find the file ${name}`)
        }


        const start = debounce(() => {
            console.log("STARTING Users code")
        }, 100)

        chokidar.watch('.')
            .on('add', start)
            .on("change", start)
            .on("unlink", start)
    })

program.parse(process.argv)

