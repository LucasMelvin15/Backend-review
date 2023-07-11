const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  //no user or pwd
  if (!user || !pwd)
    return res.status(400).json({ message: "requires both user and password" });
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) res.sendStatus(401); // unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};
