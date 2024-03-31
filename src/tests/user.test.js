const request = require('supertest');
const app = require('../app');


let id;
let token;

test('POST /users/login/debe iniciar sesion con un usuario', async () => {
    const body = {
        email: "carlos@gmail.com",
        password: "carlos1234"
    };

    const res = await request(app)
        .post(`/users/login`)
        .send(body);
        token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});
test('POST /users/login/login con credenciales invalidas debe enviar error', async () => {
    const body = {
        email: "incorrecto@gmail.com",
        password: "incorrecto1234"
    };

    const res = await request(app)
        .post(`/users/login`)
        .send(body);
     expect(res.status).toBe(401);
});

test('GET /users  debe traer todos los usuarios', async () =>{
    const res = await request(app).get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});



test('POST /users debe crear un usuario', async () => {
    const body = {
        firstName: "Carlos",
        lastName: "Perez",
        email: "carloss@gmail.com",
        password: "carloss1234",
        gender: "Hombre"
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /users/:id debe actualizar un usuario', async () => {
    const body = {
        firstName: "Carlos actualizado"
    }
    const res = await request(app).put(`/users/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});



test('DELETE /users/:id debe eliminar un usuarios', async () => {
    const res = await request(app).delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
});