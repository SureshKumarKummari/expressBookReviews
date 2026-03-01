// Shared books database structure
let books = {
    "978-0-123456-78-9": {
        "isbn": "978-0-123456-78-9",
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {
            "user1": "A powerful narrative about African culture.",
            "user2": "Excellent book with deep insights."
        }
    },
    "978-0-987654-32-1": {
        "isbn": "978-0-987654-32-1",
        "author": "Harper Lee",
        "title": "To Kill a Mockingbird",
        "reviews": {
            "user3": "A classic that everyone should read.",
            "user4": "Thought-provoking and beautifully written."
        }
    },
    "978-0-555555-55-5": {
        "isbn": "978-0-555555-55-5",
        "author": "George Orwell",
        "title": "1984",
        "reviews": {
            "user5": "Disturbing but important read."
        }
    },
    "978-0-111111-11-1": {
        "isbn": "978-0-111111-11-1",
        "author": "J.K. Rowling",
        "title": "Harry Potter and the Philosopher's Stone",
        "reviews": {
            "user6": "Magical and enchanting!"
        }
    },
    "978-0-222222-22-2": {
        "isbn": "978-0-222222-22-2",
        "author": "J.K. Rowling",
        "title": "Harry Potter and the Chamber of Secrets",
        "reviews": {}
    },
    "978-0-333333-33-3": {
        "isbn": "978-0-333333-33-3",
        "author": "J.R.R. Tolkien",
        "title": "The Hobbit",
        "reviews": {
            "user7": "An adventure of a lifetime!"
        }
    }
};

// Shared users database for registration
let users = {};

module.exports = { books, users };
