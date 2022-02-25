const fs = require('fs')

class UserRepository {
    constructor(fileName) {
        if (!fileName) {
            throw new Error('Need a filename to be passed while creating the user repo')
        }

        this.fileName = fileName;

        try {
            fs.accessSync(this.fileName)
        }
        catch (err) {
            fs.writeFileSync(this.fileName, '[]')
        }
    }
}

new UserRepository('test.txt')