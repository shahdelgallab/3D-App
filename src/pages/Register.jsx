import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { registerUser, removeGuest } from "../redux/slice/authSlice";
import { mergeCart } from "../redux/slice/cartSlice";
import HeroImage from "../assets/hero-3d-printing.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  let redirect = new URLSearchParams(location.search).get("redirect") || "/";
  if (!redirect.startsWith("/")) {
    redirect = `/${redirect}`;
  }

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !logged) {
      toast.info("You are already signed in.");
      navigate("/profile", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    setLogged(true);

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();

      await dispatch(mergeCart()).unwrap();

      toast.success("Account created successfully!");
      navigate(redirect, { replace: true });
      dispatch(removeGuest());
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
      setPasswordError(
        "Password must contain at least one letter and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    if (newName.length > 0 && newName.length < 3) {
      setNameError("Name must be at least 3 characters long.");
    } else {
      setNameError("");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg"
        >
          <div className="text-center mb-6">
            <Link to="/" className="text-3xl font-bold">
              3D App
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Join us to start creating!
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange} 
              className={`w-full p-2 border rounded border-gray-300 ${
                nameError ? "border-red-500" : "" 
              }`}
              placeholder="Enter your name"
              required
            />
            {nameError && (
              <p className="text-red-500 text-xs mt-1">{nameError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded border-gray-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-2 border rounded border-gray-300 ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="Create a password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${redirect}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src={HeroImage}
          alt="3D Printed Abstract Art"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
