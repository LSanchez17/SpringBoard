process.env.NODE_ENV = "test";

const request = require('supertest');

const app = require('../express-bookstore/app');
const db = require('../express-bookstore/db');

let bookISBN;

beforeEach( async () => {
    ///Stores a newly created book into database, and stores its isbn
    let result = await db.query(`
    INSERT INTO 
      books (isbn, amazon_url,author,language,pages,publisher,title,year)   
    VALUES(
        '123432122', 
        'https://amazon.com/taco', 
        'Elie', 
        'English', 
        100,  
        'Nothing publishers', 
        'my first book', 2008) 
    RETURNING isbn`);

    bookISBN = result.rows[0].isbn
});

describe('POST to /books', async () => {
    test('Create a new book, schema compliant', async () => {
        const response = await request(app)
        .post('/books')
        .send({
          "isbn":"0691161518",
          "amazon_url":"http://a.co/eobPtX2",
          "author":"Matthew Lane",
          "language":"english",
          "pages":264,
          "publisher":"Princeton University Press",
          "title":"Power-Up: Unlocking the Hidden Mathematics in Video Games",
          "year":2017
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty('isbn');
    })

    test('Cant create book === schema', async() => {
        const response = await request(app)
        .post('/books')
        .send({
            "isbn":"069116228",
            "amazon_url":"http://a.co/eobPtX2",
            "language":"english",
            "pages":264,
            "title":"Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year":2017
        })
        expect(response.statusCode).toBe(400);
    })
}
)

describe('Get /books', async () => {
    test('All books', async () => {
        const response = await request(app).get('/books');

        const books = response.body.books;
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveProperty('isbn');
    })
})

describe('Get /books/:isbn', async () => {
    test('One book', async () => {
        const response = await request(app).get(`/books/${bookISBN}`);

        expect(response.body.book).toHaveProperty('isbn');
    })
})

describe('Get /books', async () => {
    test('All books', async () => {
        const response = await request(app).get('/books');

        const books = response.body.books;
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveProperty('isbn');
    })
})

describe('Put /books/:id', async () => {
    test('Update a single book', async () => {
        const response = await request(app)
        .put(`/books/${bookISBN}`)
        .send(
            {
                "amazon_url":"http://a.co/eobPtX2",
                "author":"Matthew Lane",
                "language":"english",
                "pages":300,
                "publisher":"Princeton University Press",
                "title":"Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year":2020
            })
        expect(response.body.book).toHaveProperty('isbn');
        expect(response.body.book.year).toBe(2020);
    })
})

describe("Delete in /books/:id", async function () {
    test("Delete one book", async function () {
      const response = await request(app)
          .delete(`/books/${bookISBN}`)
      expect(response.body).toEqual({message: "Book deleted"});
    });
})

afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });
  
  
afterAll(async function () {
    await db.end()
});



