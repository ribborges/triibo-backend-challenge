import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { port } from '#root/config/env.js';

// Create and setup express app
const app = express();

app.use(cors({
    credentials: true,
    methods: ['GET, POST, PUT, DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});