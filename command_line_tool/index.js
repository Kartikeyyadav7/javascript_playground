const fs = require('fs')

fs.readdir(process.cwd(), (err, filesName) => {
    if (err) {
        console.log("Error occured", err)
    }
    console.log(filesName)
})