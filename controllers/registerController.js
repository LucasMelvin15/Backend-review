const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises; // dealing with json data
const path = require("path");
const bcrypt = require("bcrypt");

//handler for new users
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  //no user or pwd
  if (!user || !pwd)
    return res.status(400).json({ message: "requires both user and password" });
  //check for duplicate entry
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); //conflict
  //create new user
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ sucess: `New ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleNewUser,
};
