import supertest from "supertest";

import app from "../src/server.js";

// Test data
const TEST_USER = {
    email: "example@email.com",
    password: "12345678"
};

describe('Auth API', () => {
    let session;

    beforeAll(() => {
        session = supertest.agent(app);
    });

    // Test POST /api/auth/login
    describe('POST /api/auth/login', () => {
        it('should login a user', async () => {
            const res = await session
                .post('/api/auth/login')
                .send(TEST_USER);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id');
        }, 30000);
    });

    // Test POST /api/auth/logout
    describe('POST /api/auth/logout', () => {
        it('should logout the user', async () => {
            const res = await session
                .post('/api/auth/logout');

            expect(res.status).toBe(200);
        }, 30000);
    });
});