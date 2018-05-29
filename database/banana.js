const mongoose = require('mongoose');
const IPA = require('ipa.js');
const { or, From } = IPA;
const Schema = mongoose.Schema;
const URI = 'mongodb://localhost:27017/db';

const types = [{
    id: 1,
    name: '进食',
    checker: new IPA({
        date: String,
        components: [{
            name: String,
            unit: String,
            amount: Number,
        }],
        message: or(String, From(undefined, null)),
    }),
}, {
    id: 2,
    name: '排便',
    checker: new IPA({
        date: String,
        name: String,
        location: or(String, From(undefined, null)),
        message: or(String, From(undefined, null)),
    }),
}, {
    id: 3,
    name: '出行',
    checker: new IPA({
        date: String,
        location: String,
        message: or(String, From(undefined, null)),
    }),
}, {
    id: 4,
    name: '记事',
    checker: new IPA({
        date: String,
        name: or(String, From(undefined, null)),
        location: or(String, From(undefined, null)),
        message: String,
    }),
}];
const recordSchema = new Schema({
    type: Number,
    date: Date,
    name: String,
    message: String,
    location: String,
    components: [{
        name: String,
        unit: String,
        amount: Number,
    }],
});

const componentStruct = {
    name: String,
    unit: String,
};
const componentSchema = new Schema(componentStruct);
const componentChecker = new IPA(componentStruct);

const locationStruct = {
    name: String,
    address: String,
};
const locationSchema = new Schema(locationStruct);
const locationChecker = new IPA(locationStruct);

class Database {
    constructor() {
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.once('open', () => {
            console.log(`connected to Mongod Database @${URI}`);
        });
        mongoose.connect(URI);
        this.types = types;
        this.Records = mongoose.model('Records', recordSchema);
        this.Locations = mongoose.model('Location', locationSchema);
        this.Components = mongoose.model('Components', componentSchema);
    }

    createRecord(data) {
        return new Promise((resolve) => {
            if (!data || !data.type) {
                resolve(false);
            }
            const type = types.find(i => i.id === data.type);
            if (!type || !type.checker.check(data)) {
                resolve(false);
            }
            const date = new Date(data.date);
            if (isNaN(+date)) {
                resolve(false);
            }
            data.date = date;
            this.Records.create(data, (err, result) => {
                if (err) resolve(false);
                resolve(result);
            });
        });
    }

    async createComponent(data) {
        const exist = await this.Components.findOne({ name: data.name });
        if (exist) return {
            msg: '已存在相同成分',
            result: false,
        }
        return new Promise((resolve) => {
            if (!componentChecker.check(data)) {
                resolve({
                    result: false,
                    msg: '数据格式错误',
                });
            }
            this.Components.create(data, (err, result) => {
                if (err) resolve({
                    result: false,
                    msg: '查询错误',
                });
                resolve({
                    result: true,
                });
            });
        });
    }

    getRecords(query = {}) {
        return this.Records.find(query);
    }

    getComponents() {
        return this.Components.find({});
    }

    $$delete(model, query) {
        return this[model].deleteMany(query);
    }
}

module.exports = (() => {
    let instance = null;
    return (...params) => {
        if (!instance) {
            instance = new Database(...params);
        }
        return instance;
    }
})();