const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, email, pwd } = req.body;
  if (!user || !pwd || !email)
    return res.status(400).json({ message: "All fields filled are required." });
  const duplicateUser = await User.findOne({ username: user }).exec();
  const duplicateEmail = await User.findOne({ email: email }).exec();
  if (duplicateUser && duplicateEmail) return res.sendStatus(423);
  if (duplicateUser) return res.sendStatus(409);
  if (duplicateEmail) return res.sendStatus(422);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      email: email,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
