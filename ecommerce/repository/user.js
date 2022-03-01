const fs = require('fs')
const crypto = require('crypto');
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)

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

        const salt = crypto.randomBytes(8).toString('hex')
        const buff = await scrypt(attr.password, salt, 64)

        const records = await this.getAll()

        const record = {
            ...attr,
            password: `${buff.toString('hex')}.${salt}`
        }

        records.push(record);

        this.writeAll(records)

        return record;
    }

    async comparedPassword(saved, supplied) {
        const [hashed, salt] = saved.split('.')

        const hashSuppliedBuff = await scrypt(supplied, salt, 64)

        return hashed === hashSuppliedBuff.toString('hex')
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

    async getOneBy(filters) {

        const records = await this.getAll()

        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) {
                return record;
            }
        }
    }
}

module.exports = new UserRepository('users.json')