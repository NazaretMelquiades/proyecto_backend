const request = require('supertest');
//revisar porque si exporto a app, listenner no es compatible
const app = require('../app'); 

describe('Favorites API Integration Tests', () => {
    let testUserId = 'test-user';
    let testMovieId = 'movie-123';

    // limpiar datos antes de test
    beforeAll(async () => {
        // Eliminar si ya existe
        await request(app)
            .delete('/api/favorites')
            .send({ user_id: testUserId, movie_id: testMovieId });
    });

    it('POST /api/favorites → should add a favorite', async () => {
        const response = await request(app)
            .post('/api/favorites')
            .send({
                user_id: testUserId,
                movie_id: testMovieId,
                title: 'Test Movie',
                source: 'IMDb'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Favorite added successfully');
        expect(response.body.data).toMatchObject({
            user_id: testUserId,
            movie_id: testMovieId
        });
    });

    it('GET /api/favorites/:user_id → should return user favorites', async () => {
        const response = await request(app).get(`/api/favorites/${testUserId}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('movie_id', testMovieId);
    });

    it('DELETE /api/favorites → should delete a favorite', async () => {
        const response = await request(app)
            .delete('/api/favorites')
            .send({ user_id: testUserId, movie_id: testMovieId });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Favorite deleted succesfuly');
    });

    it('GET /api/favorites/:user_id → should return 404 after deletion', async () => {
        const response = await request(app).get(`/api/favorites/${testUserId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'No favourites found for this user');
    });
});

