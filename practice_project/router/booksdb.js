//books database structure
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
    },

    "978-0-444444-44-4": {
        "isbn": "978-0-444444-44-4",
        "author": "F. Scott Fitzgerald",
        "title": "The Great Gatsby",
        "reviews": {}
    },
    "978-0-666666-66-6": {
        "isbn": "978-0-666666-66-6",
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "978-0-777777-77-7": {
        "isbn": "978-0-777777-77-7",
        "author": "Mark Twain",
        "title": "Adventures of Huckleberry Finn",
        "reviews": {}
    },
    "978-0-888888-88-8": {
        "isbn": "978-0-888888-88-8",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "reviews": {}
    }
};

// Shared users database for registration
let users = {
    "user1": {
        "username": "user1",
        "password": "password1",
        "email": "user1@example.com"
    },
    "user2": {
        "username": "user2",
        "password": "password2",
        "email": "user2@example.com"
    },
    "user3": {
        "username": "user3",
        "password": "password3",
        "email": "user3@example.com"
    },
    "user4": {
        "username": "user4",
        "password": "password4",
        "email": "user4@example.com"
    },
    "user5": {
        "username": "user5",
        "password": "password5",
        "email": "user5@example.com"
    },
    "user6": {
        "username": "user6",
        "password": "password6",
        "email": "user6@example.com"
    },
    "user7": {
        "username": "user7",
        "password": "password7",
        "email": "user7@example.com"
    },
    "user8": {
        "username": "user8",
        "password": "password8",
        "email": "user8@example.com"
    },
    "user9": {
        "username": "user9",
        "password": "password9",
        "email": "user9@example.com"
    },
    "user10": {
        "username": "user10",
        "password": "password10",
        "email": "user10@example.com"
    },
};

module.exports = { books, users };