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

export { postApiSignup };