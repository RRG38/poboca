const bcrypt = require("bcryptjs");
const db = (req) => req.app.get("db");

const getUser = async (req, res) => {
  // console.log(req.body);
  try {
      const user = await db(req).user.find_user_by_username(req.body.username);
      // console.log(user);
      return res.status(200).send(user);
  } catch (err) {
      console.log(`Error retrieving user: ${err}`);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log(username);
  console.log(password);

  try {
      const foundUser = await db(req).user.find_user_by_username(username);
      const user = foundUser[0];
      console.log(user);
      if (!user){
          return res.status(401).send('User not found. Please register a new user before logging in.');
      } else {
          const isAuthenticated = bcrypt.compareSync(password, user.password);
          if (!isAuthenticated){
              return res.status(403).send('Incorrect password!')
          } else {
              req.session.user = {
                  id: user.id,
                  username: user.username,
                  school: user.school
              }
              console.log(req.session.user);
              return res.status(200).send(req.session.user);
          }
      }
  } catch (err) {
      console.log(`Error logging in user: ${err}`);
  }
}

const register = async (req, res) => {
  const { username, password, school } = req.body;
  // console.log(req.body);

  try {
      const result = await db(req).user.find_user_by_username([username]);
      const existingUser = result[0];
      if (existingUser){
          console.log('Username taken');
          return res.status(409).json('Username taken');
      } else {
          const hash = bcrypt.hashSync(password);
          const registeredUser = await db(req).user.create_user([username, hash, school]);
          // console.log(registeredUser);
          const user = registeredUser[0];
          req.session.user = {
              id: user.id,
              username: user.username,
              school: user.school,
          }
          return res.status(201).send(req.session.user);
      }
  } catch (err) {
      console.log(`Error registering user: ${err}`);
  }
}

const logout = async (req, res) => {
  req.session.destroy();
  res.status(200).send('User logged out');
}

module.exports = {
  getUser, login, register, logout
}