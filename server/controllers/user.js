import User from "../model/User.js";

const postApiSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const signupObj = new User({
    username,
    email,
    password,
  });
  const savedUser = await signupObj.save();

  res.json({
    success: true,
    data: savedUser,
    message: "user saved successfully...",
  });
};

const postApiLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "please provide email and password",
    });
  }
  const user = await User.findOne({
    email: email,
    password: password,
  }).select("username email");

  if (user) {
    return res.json({
      success: true,
      data: user,
      message: "login successfull...",
    });
  } else {
    return res.json({
      success: false,
      message: "invalid credentials...",
    });
  }
};

export { postApiSignup, postApiLogin };
