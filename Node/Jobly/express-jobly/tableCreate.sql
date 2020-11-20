\c jobly
CREATE TABLE users(
username text PRIMARY KEY,
password text NOT NULL,
first_name text NOT NULL,
last_name text NOT NULL,
email VARCHAR(320) NOT NULL UNIQUE,
photo_URL text,
is_admin boolean default FALSE NOT NULL
)