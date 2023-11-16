module.exports = () => {
	return new Promise((res, rej) => {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('../../database/messages')
    try {
        res(db)
    } catch(err) {
        rej("Failed to retrieve (user) database.")
    }
    });
};