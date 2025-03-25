import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { port } from '#root/config/env.js';
import router from '#root/routes/index.js';

// Create and setup express app
const app = express();

app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files for api documentation
app.use(express.static('public'));

app.use('/api', router());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});