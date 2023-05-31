-- Your SQL goes here
ALTER TABLE chats ADD COLUMN chat_state TEXT;

ALTER TABLE chats ADD COLUMN model TEXT;

UPDATE chats SET chat_state = 'idle';

UPDATE chats SET model = 'gpt-3.5-turbo';

