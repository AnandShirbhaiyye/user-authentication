import "./Signup.css";
import Navbar from "./../../components/Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import showToast from "crunchy-toast";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const response = await axios.post("/api/signup", {
      username: username,
      email: email,
      password: password,
    });
    if (response?.data?.success) {
      showToast(response?.data?.message, "success", 5000);
    } else {
      showToast(response?.data?.message, "danger", 5000);
    }
  };
  useEffect(() => {
    const userstorageData = JSON.parse(localStorage.getItem("user") || "{}");

    if (userstorageData?.email) {
      showToast("you are already logged in!", "danger", 5000);
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <form>
        <div className="signup-container p-5">
          <h2 className="text-center">SignUp</h2>
          <div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              className="btn btn-primary w-100 mb-3"
              onClick={signup}
            >
              SignUp
            </button>
            <p className="text-center">
              You have already account?
              <Link to="/login" className="link-text">
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
export default Signup;
