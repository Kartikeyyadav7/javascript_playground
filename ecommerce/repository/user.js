const fs = require('fs')
const crypto = require('crypto');
const util = require('util')
const scrypt = util.promisify(crypto.scrypt)
const Repository = require('./repository')

class UserRepository extends Repository {
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
}

module.exports = new UserRepository('users.json')