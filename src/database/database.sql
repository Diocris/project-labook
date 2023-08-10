-- Active: 1690532193418@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATE()) NOT NULL
);

CREATE TABLE posts(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT(DATE()) NOT NULL,
    updated_at TEXT DEFAULT (DATE()) NOT NULL,
    
    Foreign Key (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    
    Foreign Key (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    
    Foreign Key (post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


SELECT * FROM users;

DELETE FROM users WHERE id = "3ca5eaa4-2e09-4413-9fb8-cf79abf3038d"