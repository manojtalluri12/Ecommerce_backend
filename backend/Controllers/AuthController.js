const User = require("../Model/User.js");
const jwt = require("jsonwebtoken");
exports.Register = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    if (!username) {
      return res.status(400).json({ message: "enter username" });
    }
    if (!email) {
      return res.status(400).json({ message: "enter email" });
    }
    if (!password) {
      return res.status(400).json({ message: "enter password" });
    }
    if (!confirmpassword) {
      return res.status(400).json({ message: "enter confirmpassword" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "email already register" });
    }
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ message: "password and confirmpassword not match" });
    }
    const newuser = new User({
      username,
      email,
      password,
      confirmpassword,
    });
    await newuser.save();
    return res.status(200).json({ message: "sucessfully registered" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "server error" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "enter email" });
    }
    if (!password) {
      return res.status(400).json({ message: "enter password" });
    }
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "email not register" });
    }
    if (exist.password !== password) {
      return res.status(400).json({ message: "password not match" });
    }
    const payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtt", { expiresIn: "30h" }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "server error" });
  }
};

exports.allUser = async (req, res) => {
  try {
    let data = await User.findById(req.user.id)
    if (!data) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "server error" });
  }
};
