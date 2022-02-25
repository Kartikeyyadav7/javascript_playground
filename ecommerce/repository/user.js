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

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.fileName, {
            encoding: 'utf8'
        }))
    }
}

const test = async () => {

    const repo = new UserRepository('user.json')

    const users = await repo.getAll()

    console.log(users)
}

test()