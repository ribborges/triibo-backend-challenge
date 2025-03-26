import supertest from "supertest";

import app from "../src/server.js";

// Test data
const TEST_USER = {
    email: "example@email.com",
    password: "12345678"
};

const SAMPLE_MOVIE = {
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    year: "1999"
};

const SAMPLE_MOVIE_UPDATED = {
    title: "The Matrix Reloaded",
    description: "Freedom fighters Neo, Trinity and Morpheus continue to lead the revolt against the Machine Army, unleashing their arsenal of extraordinary skills and weaponry against the systematic forces of repression and exploitation.",
    year: "2003"
};

describe('Movies API', () => {
    let session;
    let movieId;

    beforeAll(async () => {
        session = supertest.agent(app);

        // Login
        const loginResponse = await session
            .post('/api/auth/login')
            .send(TEST_USER);

        if (loginResponse.status !== 200) throw new Error('Unable to login');
    }, 30000);

    afterAll(async () => {
        // Logout
        await session.post('/api/auth/logout');
    });

    // Test POST /api/movies
    describe('POST /api/movies', () => {
        it('should create a new movie', async () => {
            const res = await session
                .post('/api/movies')
                .send(SAMPLE_MOVIE);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');

            movieId = res.body.id;
        }, 30000);
    });

    describe('GET /api/movies', () => {
        it('should retrieve movie by ID', async () => {
            const res = await session
                .get(`/api/movies?id=${movieId}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject(SAMPLE_MOVIE);
            expect(res.body).toHaveProperty('info');
        }, 30000);
    });

    describe('GET /api/movies/all', () => {
        it('should retrieve all movies', async () => {
            const res = await session
                .get('/api/movies/all');

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        }, 30000);
    });

    describe('PUT /api/movies', () => {
        it('should update a movie', async () => {
            const res = await session
                .put(`/api/movies?id=${movieId}`)
                .send(SAMPLE_MOVIE_UPDATED);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body.updated).toMatchObject(SAMPLE_MOVIE_UPDATED);
        }, 30000);
    });

    describe('DELETE /api/movies', () => {
        it('should delete a movie', async () => {
            const res = await session
                .delete(`/api/movies?id=${movieId}`);

            expect(res.statusCode).toBe(200);
        }, 30000);
    });
});