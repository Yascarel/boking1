const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async () => {
   const res = await request(app).post('/users/login').send({
    email: "test@gmail.com",
    password: "test1234"
   })
   token = res.body.token
})

test('GET /Hotels  debe traer todos los hotel', async () =>{
    const res = await request(app).get('/hotels')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /users debe crear un usuario', async () => {
    const body = {
        name: "Camerinoo",
        description: "El mejor hotell",
        price: 2000,
        address: "Santiago0",
        lat: 2455,
        lon: 2311
    }
    const res = await request(app).post('/hotels').send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /Hotels/:id debe actualizar un hotel', async () => {
    const body = {
        name: "Camerinoo actualizado"
    }
    const res = await request(app).put(`/hotels/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /Hotels/:id debe eliminar un hotel', async () => {
    const res = await request(app).delete(`/hotels/${id}`)
    .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
});