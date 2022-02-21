const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, fileNames) => {
    if (err) {
        console.log("Error occured", err)
    }

    const statPromises = fileNames.map(fileName => {
        return lstat(path.join(targetDir, fileName))
    })

    const allStats = await Promise.all(statPromises);

    for (let stat of allStats) {
        const index = allStats.indexOf(stats);

        if (stat.isFile()) {
            console.log(fileNames[index])
        } else {
            console.log(chalk.bold(fileNames[index]))
        }

    }
})

