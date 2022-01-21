select title, content, username as author from posts p
join users u on u.id = p.author_id
where p.id = $1;