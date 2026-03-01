const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { books, users } = require('./booksdb.js');

// Task 7: Login endpoint
router.post('/login', function (req, res) {
    const { username, password } = req.body;
    
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ 
            message: "Username and password are required" 
        });
    }
    
    // Validate user credentials
    if (users[username] && users[username].password === password) {
        // Create JWT token
        const accessToken = jwt.sign(
            { 
                username: username,
                password: password 
            },
            "access",
            { expiresIn: 60 * 60 } // 1 hour
        );
        
        // Store user credentials in session
        req.session.authorization = {
            accessToken,
            username
        };
        
        return res.status(200).json({ 
            message: "User successfully logged in",
            accessToken: accessToken
        });
    } else {
        return res.status(401).json({ 
            message: "Invalid Login. Check username and password" 
        });
    }
});

// Task 8: Add or modify a book review
router.put('/auth/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const review = req.query.review; // Get review from query parameter
    
    // Check if user is authenticated (from session)
    if (!req.session.authorization || !req.session.authorization.username) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    
    const username = req.session.authorization.username;
    
    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    // Check if review is provided
    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }
    
    // Initialize reviews object if it doesn't exist
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }
    
    // Add or modify review (if same user posts different review, it modifies existing)
    books[isbn].reviews[username] = review;
    
    return res.status(200).json({ 
        message: `The review for the book with ISBN ${isbn} has been added/updated.` 
    });
});

// Task 9: Delete a book review
router.delete('/auth/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    // Check if user is authenticated (from session)
    if (!req.session.authorization || !req.session.authorization.username) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    
    const username = req.session.authorization.username;
    
    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    // Check if reviews exist for this book
    if (!books[isbn].reviews) {
        return res.status(404).json({ message: "No reviews found for this book" });
    }
    
    // Check if user has a review for this book
    if (!books[isbn].reviews[username]) {
        return res.status(404).json({ 
            message: "Review not found. You can only delete your own reviews." 
        });
    }
    
    // Delete the user's review
    delete books[isbn].reviews[username];
    
    return res.status(200).json({ 
        message: `Review for the ISBN ${isbn} posted by the user ${username} deleted.` 
    });
});

// Export the router
const authenticated = router;
module.exports = { authenticated };
