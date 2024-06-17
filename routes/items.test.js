process.env.NODE_ENV = 'test'

const require = require('supertest')

const app = require('../app')
let items = require('../fakeDB')

let pickles = { name: 'pickles', price: 1.99}

beforeEach(function() {
    items.push(pickles)
})

afterEach(function() {
    items.length = 0
})

describe('get /items', function() {
    test('gets list of items', async function() {
        const resp = await app.request(app).get('/items')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({items: [pickles]})
    })
})

describe('GET /items/:name', function() {
    test('gets item', async function() {
        const resp = await app.request(app).get(`/items/${pickles.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({items: pickles})
    })

    test('respond with 404 if item not found', async function() {
        const resp = await app.request(app).get('/items/0')
        expect(resp.statusCode).toBe(404)
    })
})

describe("POST /items", function() {
    test('creates new item', async function() {
        const resp = await app.request(app).post('/items').send({ name: 'hotdog', price: 2.99})
    expect(resp.statusCode).toBe(201)
    expect(resp.body).toEqual( { items: {name: 'hotdog', price: 2.99} })
    })
})

describe('PATCH /items/:name', function() {
    test('update item', async function() {
        const resp = await app.request(app).patch(`/items/${pickles.name}`).send({ name: 'popcorn' })
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual({ items: { name: 'popcorn' }
    })
    })
    test('respond with 404', async function() {
        const resp = await app.request(app).patch(`/items/0`)
        expect(resp.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', function() {
    test('deletes item', async function() {
        const resp = await app.request(app).delete(`/items/${pickles.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ msg: 'Deleted' })
    })
})