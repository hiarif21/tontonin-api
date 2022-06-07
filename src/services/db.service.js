import mongoose from 'mongoose';
import dbConfig from '../configs/db.config.js';

mongoose.connect(dbConfig.uri, dbConfig.options);

const db = mongoose.connection;

export default db;
