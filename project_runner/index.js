const chokidar = require('chokidar')
const debounce = require("lodash.debounce")
const program = require('caporal')
const fs = require('fs')
const chalk = require("chalk")
const { spawn } = require("child_process")

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

        let proc;
        const start = debounce(() => {
            if (proc) {
                proc.kill()
            }
            console.log(chalk.green(">>>>> Starting process"))
            proc = spawn('node', name, { stdio: 'inherit' })
        }, 100)

        chokidar.watch('.')
            .on('add', start)
            .on("change", start)
            .on("unlink", start)
    })

program.parse(process.argv)

