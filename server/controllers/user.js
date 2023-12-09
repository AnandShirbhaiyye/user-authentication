import User from "../model/User.js";
import jwt from "jsonwebtoken";

const postApiSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.json({
        success: false,
        message: "Please enter all fields",
      });
    }
    const signupObj = new User({
      username,
      email,
      password,
    });
    const savedUser = await signupObj.save();

    if (!process.env.SECRET_KEYS) {
      return res.status(500).json({
        success: false,
        message: "Secret key not defined",
      });
    }

    const token = jwt.sign(
      { userId: savedUser._id, isAdmin: true },
      process.env.SECRET_KEYS,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      data: {
        savedUser: savedUser,
        jwt_token: token,
      },
      message: "User saved successfully...",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const postApiLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email, password }).select(
      "username email"
    );

    if (user) {
      if (!process.env.SECRET_KEYS) {
        return res.status(500).json({
          success: false,
          message: "Secret key not defined",
        });
      }
      const token = jwt.sign(
        { userId: user._id, isAdmin: true },
        process.env.SECRET_KEYS,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        data: {
          user: user,
          email: email,
          jwt_token: token,
        },
        message: "Login successful...",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials...",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const postapiRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { postApiSignup, postApiLogin, postapiRegister };
