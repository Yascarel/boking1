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

test('GET /cities  debe traer todos los city', async () =>{
    const res = await request(app).get('/cities')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /users debe crear un usuario', async () => {
    const body = {
       name: "Santiago",
       country: "RD",
       countryId: "2"  
    }
    const res = await request(app).post('/cities').send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /cities/:id debe actualizar un city', async () => {
    const body = {
        name: "santiago actualizado"
    }
    const res = await request(app).put(`/cities/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /cities/:id debe eliminar un city', async () => {
    const res = await request(app).delete(`/cities/${id}`)
    .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
});

