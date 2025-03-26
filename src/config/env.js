import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;
const omdbApiKey = process.env.OMDB_API_KEY;
const secret = process.env.SECRET;

export { port, omdbApiKey, secret };