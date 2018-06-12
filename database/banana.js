const mongoose = require('mongoose');
const IPA = require('ipa.js');
const { or, From } = IPA;
const Schema = mongoose.Schema;
const connector = require('./connector');

const types = [{
    id: 0,
    name: '数据',
    checker: new IPA({
        date: String,
        components: [{
            name: String,
            unit: String,
            amount: Number,
        }],
        message: or(String, From(undefined, null)),
    })
}, {
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

const locationSchema = new Schema({
    name: String,
});

class Database {
    constructor() {
        connector.connect();
        this.types = types;
        this.Records = mongoose.model('Records', recordSchema);
        this.Locations = mongoose.model('Location', locationSchema);
        this.Components = mongoose.model('Components', componentSchema);
        this.Locations =  mongoose.model('Locations', locationSchema);
    }

    async createRecord(data) {
        if (!data || !Number.isInteger(data.type)) {
            return false;
        }
        const type = types.find(i => i.id === data.type);
        if (!type || !type.checker.check(data)) {
            return false;
        }
        const date = new Date(data.date);
        if (isNaN(+date)) {
            resolve(false);
        }
        data.date = date;
        if (data.location) {
            await this.Locations.create({
                name: data.location
            });
        }
        if (data.components) {
            const allComps = await this.Components.find({});
            const newComps = [];
            data.components.forEach(comp => {
                if (!allComps.find(i => i.name === comp.name)) {
                    newComps.push(comp);
                }
            });
            if (newComps.length) {
                await this.Components.insertMany(newComps)
            }
        }
        return this.Records.create(data);
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