const express = require('express');
const router = express.Router();
const { books, users } = require('./booksdb.js');

// Helper function to get all books (using Promise)
function getAllBooks() {
    return new Promise((resolve, reject) => {
        try {
            resolve(books);
        } catch (error) {
            reject(error);
        }
    });
}

// Helper function to get book by ISBN (using Promise)
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        try {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject(new Error("Book not found"));
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Helper function to get books by author (using Promise)
function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        try {
            const matchingBooks = [];
            const bookKeys = Object.keys(books);
            
            for (let i = 0; i < bookKeys.length; i++) {
                const isbn = bookKeys[i];
                if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
                    matchingBooks.push(books[isbn]);
                }
            }
            
            if (matchingBooks.length > 0) {
                resolve(matchingBooks);
            } else {
                reject(new Error("No books found for this author"));
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Helper function to get books by title (using Promise)
function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        try {
            const matchingBooks = [];
            const bookKeys = Object.keys(books);
            
            for (let i = 0; i < bookKeys.length; i++) {
                const isbn = bookKeys[i];
                if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
                    matchingBooks.push(books[isbn]);
                }
            }
            
            if (matchingBooks.length > 0) {
                resolve(matchingBooks);
            } else {
                reject(new Error("No books found with this title"));
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Task 1 & Task 10: Get all books (using async/await)
router.get('/', async function (req, res) {
    try {
        const allBooks = await getAllBooks();
        res.status(200).json(JSON.stringify(allBooks, null, 2));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Task 2 & Task 11: Get book details by ISBN (using async/await)
router.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const book = await getBookByISBN(isbn);
        res.status(200).json(JSON.stringify(book, null, 2));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 3 & Task 12: Get book details by author (using async/await)
router.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const matchingBooks = await getBooksByAuthor(author);
        res.status(200).json(JSON.stringify(matchingBooks, null, 2));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 4 & Task 13: Get book details by title (using async/await)
router.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const matchingBooks = await getBooksByTitle(title);
        res.status(200).json(JSON.stringify(matchingBooks, null, 2));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 5: Get book reviews by ISBN
router.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    // Check if book exists
    if (books[isbn]) {
        const reviews = books[isbn].reviews;
        
        if (Object.keys(reviews).length > 0) {
            res.status(200).json(JSON.stringify(reviews, null, 2));
        } else {
            res.status(200).json({ message: "No reviews found for this book" });
        }
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 6: Register a new user
router.post('/register', function (req, res) {
    const { username, password } = req.body;
    
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ 
            message: "Username and password are required" 
        });
    }
    
    // Check if username already exists
    if (users[username]) {
        return res.status(409).json({ 
            message: "Username already exists. Please choose a different username." 
        });
    }
    
    // Register the new user
    users[username] = {
        username: username,
        password: password // In production, this should be hashed
    };
    
    res.status(201).json({ 
        message: "User successfully registered. Now you can login." 
    });
});

// Export the router
const general = router;
module.exports = { general };
