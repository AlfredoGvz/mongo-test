const seedTestData = require('../seeds/seed-test')
const app = require('../app/app')
const request = require('supertest')


beforeAll(() => seedTestData());


describe('/api/cities', () => {
    it('should respond with an array of city objects witht the correct properties', () => {
        return request(app)
        .get('/api/cities')
        .expect(200)
        .then(() => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('name', 'Manchester');
            expect(response.body[0]).toHaveProperty('latitude', 53.4794892);
            expect(response.body[0]).toHaveProperty('longitude', -2.2451148);
        })
    })
})


        // .then(({body}) => {
        //     const topics = body.topics
        //     expect(topics.length).toBeGreaterThan(0)
        //     topics.forEach((element) => {
        //         expect(element).toEqual(
        //             expect.objectContaining({
        //                 slug: expect.any(String),
        //                 description: expect.any(String)
        //             })
//         })
//     })
// })
