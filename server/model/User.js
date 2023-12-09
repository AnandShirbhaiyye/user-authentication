import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

const User = model("User", userSchema);
export default User;
