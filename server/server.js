require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const express = require("express");
userCtrl = require("./controllers/user");
postCtrl = require("./controllers/posts");

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const { login, register, logout } = require('./controllers/user');

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("DB connection established!");
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err}`);
  });

// Auth Endpoints
app.post('/auth/login', login);
app.post('/auth/register', register);
app.get('/auth/logout', logout);

//Post Endpoints
app.get("/api/posts", postCtrl.readPosts);
app.post("/api/post", postCtrl.createPost);
app.get("/api/post/:id", postCtrl.readPost);
app.delete("/api/post/:id", postCtrl.deletePost);

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));
