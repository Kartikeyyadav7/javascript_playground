const fs = require('fs')
const chalk = require('chalk')

const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, fileNames) => {
    if (err) {
        console.log("Error occured", err)
    }

    const statPromises = fileNames.map(fileName => {
        return lstat(fileName)
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

