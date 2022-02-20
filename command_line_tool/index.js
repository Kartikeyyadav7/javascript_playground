const fs = require('fs')

fs.readdir(process.cwd(), (err, filesNames) => {
    if (err) {
        console.log("Error occured", err)
    }
    for (let fileName of fileNames) {
        fs.lstat(fileName, (err, stats) => {
            if (err) {
                console.log(err)
            }
            console.log(fileName, stats.isFile())
        })
    }
})