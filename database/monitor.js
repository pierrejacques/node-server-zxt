const mongoose = require('mongoose');
const IPA = require('ipa.js');
const { or, From } = IPA;
const Schema = mongoose.Schema;
const connector = require('./connector');

const checker = new IPA({
    stamp: Number,
    type: From('PageView', 'ModuleClick'),
    isProd: Boolean,
    info: {
        pageId: String,
        elementId: or(String, From(undefined, null)),
        payload: or(Object, From(undefined, null)),
    },
});

const schema = new Schema({
    stamp: Number,
    type: String,
    isProd: Boolean,
    info: {
        pageId: String,
        elementId: String,
        payload: Object,
    },
});

class Database {
    constructor() {
        connector.connect();
        this.Records = mongoose.model('MonitorRecord', schema);
    }

    async createRecord(content) {
        if (!checker.check(content)) {
            console.log('Monitor recording type error, recording failed');
            return false;
        }
        const result = await this.Records.create(content);
        return result;
    }
}

module.exports = (() => {
    let instance = null;
    return () => instance || (instance = new Database());
})();