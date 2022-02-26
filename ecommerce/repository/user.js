const fs = require('fs')
const crypto = require('crypto')

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
        attr.id = this.randomId()
        const records = await this.getAll()
        records.push(attr);
        this.writeAll(records)
    }

    async writeAll(records) {
        //* Here the '2' argument in JSON.stringify function is used to define the leve of indentation we need in the file itself so that it is easier to read
        await fs.promises.writeFile(this.fileName, JSON.stringify(records, null, 2))

    }

    randomId() {
        return crypto.randomBytes(4).toString('hex')
    }

    async getOne(id) {
        const records = await this.getAll()
        return records.find(record => record.id === id)
    }

    async delete(id) {
        const records = await this.getAll()
        const filteredRecords = records.filter(record => record.id !== id)
        await this.writeAll(filteredRecords)
    }

    async update(id, attr) {
        const records = await this.getAll()
        const record = records.find(record => record.id === id)

        if (!record) {
            throw new Error(`No record with the given ${id} ID`)
        }
        //* Object.assign copies the attr to the record object
        Object.assign(record, attr)

        await this.writeAll(records)

    }
}

const test = async () => {

    const repo = new UserRepository('user.json')

    await repo.update('671a689a', { confirmPassword1: "asdasdf" })

}

test()