const express = require('express');
const router = express.Router();
const { books, users } = require('./booksdb.js');

/* ---------------- HELPER FUNCTIONS (ASYNC/AWAIT) ---------------- */

// Get all books
async function getAllBooks() {
    return books;
}

// Get book by ISBN
async function getBookByISBN(isbn) {
    if (books[isbn]) return books[isbn];
    throw new Error('Book not found');
}

// Get books by author
async function getBooksByAuthor(author) {
    const result = Object.values(books).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
    );
    if (result.length) return result;
    throw new Error('No books found for this author');
}

// Get books by title
async function getBooksByTitle(title) {
    const result = Object.values(books).filter(
        book => book.title.toLowerCase() === title.toLowerCase()
    );
    if (result.length) return result;
    throw new Error('No books found with this title');
}

// Get reviews by ISBN
async function getReviewsByISBN(isbn) {
    if (!books[isbn]) throw new Error('Book not found');
    return books[isbn].reviews;
}

// Register user
async function registerUser(username, password) {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    if (users[username]) {
        throw new Error('User already exists');
    }
    users[username] = { username, password };
    return { message: 'User successfully registered. Now you can login.' };
}

/* ---------------- ROUTES ---------------- */

router.get('/', async (req, res) => {
    res.status(200).json(await getAllBooks());
});

router.get('/isbn/:isbn', async (req, res) => {
    try {
        res.status(200).json(await getBookByISBN(req.params.isbn));
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.get('/author/:author', async (req, res) => {
    try {
        res.status(200).json(await getBooksByAuthor(req.params.author));
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.get('/title/:title', async (req, res) => {
    try {
        res.status(200).json(await getBooksByTitle(req.params.title));
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.get('/review/:isbn', async (req, res) => {
    try {
        res.status(200).json(await getReviewsByISBN(req.params.isbn));
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        res.status(201).json(await registerUser(req.body.username, req.body.password));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = { general: router };