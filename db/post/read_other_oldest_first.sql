select p.id as post_id, title, content, username as author_username, date_created from posts p
join users u on u.id = p.author_id
where author_id != $1
order by date_created asc;