SELECT p.id AS post_id,
title, content, date_created, username AS author_username
FROM posts p JOIN users u ON p.author_id = u.id
WHERE lower(title) NOT $1
ORDER BY date_created DESC;