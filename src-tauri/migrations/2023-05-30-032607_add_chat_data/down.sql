-- This file should undo anything in `up.sql`

CREATE TABLE new_chats (
    id INT,
    name TEXT
);

INSERT INTO new_chats SELECT id, name FROM chats;

DROP TABLE chats;

ALTER TABLE new_chats RENAME TO chats;

