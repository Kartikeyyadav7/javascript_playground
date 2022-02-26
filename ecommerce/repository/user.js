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

    async create(attr) {
        const records = await this.getAll()
        records.push(attr);
        //* Here the '2' argument in JSON.stringify function is used to define the leve of indentation we need in the file itself so that it is easier to read
        await fs.promises.writeFile(this.fileName, JSON.stringify(records, null, 2))
    }
}

const test = async () => {

    const repo = new UserRepository('user.json')
    await repo.create({ email: "hello@gmail.com", password: "password" })
    const users = await repo.getAll()

    console.log(users)
}

test()