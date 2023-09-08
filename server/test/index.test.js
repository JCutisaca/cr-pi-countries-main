const app = require('../src/server');
const session = require('supertest');
const request = session(app);

describe("Test de Rutas", () => {
    describe("GET /countries/:idPais", () => {
        it("Responde con status: 200'", async () => {
            await request.get('/countries/ARG').expect(200);
        })
        it('Responde un objeto con las propiedades', async () => {
            const response = await request.get('/countries/ARG');
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("flag");
            expect(response.body).toHaveProperty("continents");
            expect(response.body).toHaveProperty("capital");
            expect(response.body).toHaveProperty("subregion");
            expect(response.body).toHaveProperty("area");
            expect(response.body).toHaveProperty("population");
            expect(response.body).toHaveProperty("Activities");
        })
        it('Si hay un error responde con status: 400', async () => {
            await request.get('/countries/KER').expect(400);
            await request.get('/countries/FRE').expect(400);
        });
        describe("GET /countries/name", () => {
            it("Debería responder con status 200 y una lista de países por nombre", async () => {
                const response = await request.get('/countries/name?name=Argentina');
                expect(response.status).toBe(200);
                expect(response.body).toHaveLength(1);
            });
            it("Debería responder con status 404 y una lista vacía si no se encuentra ningún país", async () => {
                const response = await request.get('/countries/name?name=noexisto');
                expect(response.status).toBe(404);
                expect(response.body).toEqual({ error: "No countries were found with the specified name." });
            });
            it("Debería responder con status 404 si no se proporciona el parámetro 'name'", async () => {
                const response = await request.get('/countries/name');
                expect(response.status).toBe(404);
            });
        });
    })
    describe("POST /activities", () => {
        it("Debería crear una actividad y responder con status 200", async () => {
            const activityData = {
                CountriesId: ["ARG", "KEN", "FRA"],
                name: "LPM",
                dificultad: "1",
                duracion: "3",
                temporada: ["Summer", "Fall", "Winter"]
            };
            const response = await request.post('/activities').send(activityData);
            expect(response.status).toBe(201);
        });

        it("Debería responder con status 400 si falta información requerida", async () => {
            const incompleteActivityData = {
                CountriesId: ["ARG", "KEN", "FRA"],
                name: "LPM",
                duracion: "3",
                temporada: ["Summer", "Fall", "Winter"]
            };
            const response = await request.post('/activities').send(incompleteActivityData);
            expect(response.status).toBe(400);
        });
        it("Debería responder con status 400 si no se encuentra un país", async () => {
            const invalidCountryId = {
                CountriesId: ["XYZ"],
                name: "LPM",
                dificultad: "1",
                duracion: "3",
                temporada: ["Summer", "Fall", "Winter"]
            };
            const response = await request.post('/activities').send(invalidCountryId);
            expect(response.status).toBe(400);
        });
    });
    describe("PUT /update", () => {
        it("Debería actualizar una actividad y responder con status 200", async () => {
            const activityData = {
                CountriesId: ["ARG", "KEN", "FRA"],
                name: "Prueba",
                dificultad: "1",
                duracion: "3",
                temporada: ["Summer", "Fall", "Winter"]
            };
            const newPost = await request.post('/activities').send(activityData);
            const updateData = {
                ActivityId: 1,
                name: "Soy una prueba",
                temporada: ["Spring"]
            };
            const response = await request.put('/activities').send(updateData);
            expect(response.status).toBe(200);
        });
        it("Debería responder con status 400 si falta información requerida", async () => {
            const incompleteUpdateData = {
                name: "Soy una prueba",
                temporada: ["Spring"]
            };
            const response = await request.put('/activities').send(incompleteUpdateData);
            expect(response.status).toBe(400);
        });
        it("Debería responder con status 404 si no se encuentra la actividad", async () => {
            const failUpdateData = {
                ActivityId: 1000,
                name: "Soy una prueba",
                temporada: ["Spring"]
            };
            const response = await request.put('/update').send(failUpdateData);
            expect(response.status).toBe(404);
        });
    });
    describe("DELETE /activities/:ActivityId", () => {
        it("Debería eliminar una actividad y responder con status 200", async () => {
            let existegActivityId = 1;

            const response = await request.delete(`/activities/${existegActivityId}`);
            existegActivityId++;
            expect(response.status).toBe(200);
        });
        it("Debería responder con status 404 si no se proporciona un ID de actividad", async () => {
            const response = await request.delete('/activities/');
            expect(response.status).toBe(404);
        });
        it("Debería responder con status 400 si no se encuentra la actividad", async () => {
            const nonExistetActivityId = 999;
            const response = await request.delete(`/activities/${nonExistetActivityId}`);
            expect(response.status).toBe(400);
        });
    });
})