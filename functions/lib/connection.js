const mongoose = require('mongoose');
const server = 'mongodb';
const database = 'test';
class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
            console.log('Database connection successful');
        })
            .catch(err => {
            console.error('Database connection error');
        });
    }
}
mongoose.set('useFindAndModify', true);
module.exports = new Database();
//# sourceMappingURL=connection.js.map