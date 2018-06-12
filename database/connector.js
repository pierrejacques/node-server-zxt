const mongoose = require('mongoose');

class Connector {
    constructor() {
        this.URI = 'mongodb://localhost:27017/db';
        this.isConnected = false;
    }

    connect() {
        if (this.isConnected) return;
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.once('open', () => {
            console.log(`connected to Mongod Database @${this.URI}`);
        });
        mongoose.connect(this.URI);
        this.isConnected = true;
    }
}

module.exports = new Connector();