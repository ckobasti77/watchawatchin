const User = require("../model/User");

const handleLogout = async (req, res) => {
  // on client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'None' });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  // const otherUsers = usersDB.users.filter(
  //   (person) => person.refreshToken !== foundUser.refreshToken
  // );
  // const currentUser = { ...foundUser, refreshToken: "" };
  // usersDB.setUsers([...otherUsers, currentUser]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "model", "Users.json"),
  //   JSON.stringify(usersDB.users)
  // );

  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false }); // secure: true - only servers on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
