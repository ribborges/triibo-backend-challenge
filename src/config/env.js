import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;
const omdbApiKey = process.env.OMDB_API_KEY;

export { port, omdbApiKey };