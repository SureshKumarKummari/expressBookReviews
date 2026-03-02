// const express = require('express');
// const router = express.Router();
// const { books, users } = require('./booksdb.js');

// // Helper function to get all books (using Promise)
// function getAllBooks() {
//     return new Promise((resolve, reject) => {
//         try {
//             resolve(books);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// // Helper function to get book by ISBN (using Promise)
// function getBookByISBN(isbn) {
//     return new Promise((resolve, reject) => {
//         try {
//             if (books[isbn]) {
//                 resolve(books[isbn]);
//             } else {
//                 reject(new Error("Book not found"));
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// // Helper function to get books by author (using Promise)
// function getBooksByAuthor(author) {
//     return new Promise((resolve, reject) => {
//         try {
//             const matchingBooks = [];
//             const bookKeys = Object.keys(books);
            
//             for (let i = 0; i < bookKeys.length; i++) {
//                 const isbn = bookKeys[i];
//                 if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
//                     matchingBooks.push(books[isbn]);
//                 }
//             }
            
//             if (matchingBooks.length > 0) {
//                 resolve(matchingBooks);
//             } else {
//                 reject(new Error("No books found for this author"));
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// // Helper function to get books by title (using Promise)
// function getBooksByTitle(title) {
//     return new Promise((resolve, reject) => {
//         try {
//             const matchingBooks = [];
//             const bookKeys = Object.keys(books);
            
//             for (let i = 0; i < bookKeys.length; i++) {
//                 const isbn = bookKeys[i];
//                 if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
//                     matchingBooks.push(books[isbn]);
//                 }
//             }
            
//             if (matchingBooks.length > 0) {
//                 resolve(matchingBooks);
//             } else {
//                 reject(new Error("No books found with this title"));
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// // Helper function to get book reviews by ISBN (using Promise)
// function getReviewsByISBN(isbn) {
//     return new Promise((resolve, reject) => {
//         try {
//             if (!books[isbn]) {
//                 reject(new Error("Book not found"));
//                 return;
//             }
//             const reviews = books[isbn].reviews;
//             if (Object.keys(reviews).length > 0) {
//                 resolve(reviews);
//             } else {
//                 resolve({ message: "No reviews found for this book" });
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// // Helper function to register a new user (using Promise)
// function registerUser(username, password) {
//     return new Promise((resolve, reject) => {
//         try {
//             if (!username || !password) {
//                 reject(new Error("Username and password are required"));
//                 return;
//             }
//             if (users[username]) {
//                 reject(new Error("Username already exists. Please choose a different username."));
//                 return;
//             }
//             users[username] = {
//                 username: username,
//                 password: password // In production, this should be hashed
//             };
//             resolve("User successfully registered. Now you can login.");
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// // Task 1 & Task 10: Get all books (using async/await)
// router.get('/', async function (req, res) {
//     try {
//         const allBooks = await getAllBooks();
//         res.status(200).json(JSON.stringify(allBooks, null, 2));
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Task 2 & Task 11: Get book details by ISBN (using async/await)
// router.get('/isbn/:isbn', async function (req, res) {
//     try {
//         const isbn = req.params.isbn;
//         const book = await getBookByISBN(isbn);
//         res.status(200).json(JSON.stringify(book, null, 2));
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// // Task 3 & Task 12: Get book details by author (using async/await)
// router.get('/author/:author', async function (req, res) {
//     try {
//         const author = req.params.author;
//         const matchingBooks = await getBooksByAuthor(author);
//         res.status(200).json(JSON.stringify(matchingBooks, null, 2));
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// // Task 4 & Task 13: Get book details by title (using async/await)
// router.get('/title/:title', async function (req, res) {
//     try {
//         const title = req.params.title;
//         const matchingBooks = await getBooksByTitle(title);
//         res.status(200).json(JSON.stringify(matchingBooks, null, 2));
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// // Task 5: Get book reviews by ISBN (using async/await)
// router.get('/review/:isbn', async function (req, res) {
//     try {
//         const isbn = req.params.isbn;
//         const result = await getReviewsByISBN(isbn);
//         if (result.message) {
//             res.status(200).json(result);
//         } else {
//             res.status(200).json(JSON.stringify(result, null, 2));
//         }
//     } catch (error) {
//         if (error.message === "Book not found") {
//             res.status(404).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: error.message });
//         }
//     }
// });

// // Task 6: Register a new user (using async/await)
// router.post('/register', async function (req, res) {
//     try {
//         const { username, password } = req.body;
//         const message = await registerUser(username, password);
//         res.status(201).json({ message });
//     } catch (error) {
//         if (error.message === "Username and password are required") {
//             res.status(400).json({ message: error.message });
//         } else if (error.message.includes("Username already exists")) {
//             res.status(409).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: error.message });
//         }
//     }
// });

// // Export the router
// const general = router;
// module.exports = { general };


const express = require('express');
const axios = require('axios');
const router = express.Router();

// Base URL of the server
const BASE_URL = 'http://localhost:5000';

/* ---------------- HELPER FUNCTIONS (USING AXIOS + ASYNC/AWAIT) ---------------- */

// Task 1 & 10: Get all books
async function getAllBooks() {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
}

// Task 2 & 11: Get book by ISBN
async function getBookByISBN(isbn) {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return response.data;
}

// Task 3 & 12: Get books by author
async function getBooksByAuthor(author) {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return response.data;
}

// Task 4 & 13: Get books by title
async function getBooksByTitle(title) {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return response.data;
}

// Task 5: Get book reviews by ISBN
async function getReviewsByISBN(isbn) {
    const response = await axios.get(`${BASE_URL}/review/${isbn}`);
    return response.data;
}

// Task 6: Register new user
async function registerUser(username, password) {
    const response = await axios.post(`${BASE_URL}/register`, {
        username,
        password
    });
    return response.data;
}

/* ---------------- ROUTES (USING ASYNC/AWAIT) ---------------- */

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
    try {
        const book = await getBookByISBN(req.params.isbn);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Get books by author
router.get('/author/:author', async (req, res) => {
    try {
        const books = await getBooksByAuthor(req.params.author);
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: 'No books found for this author' });
    }
});

// Get books by title
router.get('/title/:title', async (req, res) => {
    try {
        const books = await getBooksByTitle(req.params.title);
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: 'No books found with this title' });
    }
});

// Get reviews by ISBN
router.get('/review/:isbn', async (req, res) => {
    try {
        const reviews = await getReviewsByISBN(req.params.isbn);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await registerUser(username, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = { general: router };