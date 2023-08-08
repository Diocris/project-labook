-- Active: 1690532193418@@127.0.0.1@3306
SELECT * FROM users;

DELETE FROM users WHERE name = "admin";
DELETE FROM posts WHERE creator_id = "user001";

select * from posts;
DELETE FROM posts WHERE id = "02cf360b-5d45-4d91-85ea-c7e2ee4ce679";

SELECT * FROM posts WHERE id = "19d53d7c-baf5-4437-b44c-64f9a7497488"