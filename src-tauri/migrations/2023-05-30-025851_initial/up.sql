-- Your SQL goes here
CREATE TABLE IF NOT EXISTS chats (
    id INT,
    name TEXT
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id INT,
    chat_id INT,
    role TEXT,
    content TEXT
);
