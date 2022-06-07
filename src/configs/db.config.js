import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  uri: process.env.DATABASE_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default dbConfig;
