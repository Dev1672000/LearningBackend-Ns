const { MongoClient } = require('mongodb');

const PORT = 27017;
const uri = `mongodb://localhost:${PORT}`;

const client = new MongoClient(uri);

const DB_NAME = 'graviton_boson';

const db = client.db(DB_NAME);

module.exports = db;
