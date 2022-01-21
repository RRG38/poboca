INSERT INTO users
(username, password, school)
VALUES
($1, $2, $3)
RETURNING *;