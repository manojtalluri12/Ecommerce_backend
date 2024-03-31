const jwt = require("jsonwebtoken");

exports.middleware = async (req, res,next) => {
  try {
    let token = req.header("x-token");
    if (!token) {
      return res
        .status(400)
        .json({ message: "without Login unable to see the page" });
    }
    let decode=jwt.verify(token,'jwtt')
    req.user=decode.user
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Application issue" });
  }
};
