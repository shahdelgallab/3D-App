import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginUser, removeGuest } from "../redux/slice/authSlice";
import { mergeCart } from "../redux/slice/cartSlice";
import HeroImage from "../assets/hero-3d-printing.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !logged) {
      toast.info("You are already signed in.");
      navigate("/profile", { replace: true });
    }
  }, []);

  let redirect = new URLSearchParams(location.search).get("redirect") || "/";
  if (!redirect.startsWith("/")) {
    redirect = `/${redirect}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLogged(true);
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(mergeCart()).unwrap();
      toast.success("Welcome back!");
      navigate(redirect, { replace: true });
      dispatch(removeGuest());
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials to sign in.
          </p>

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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${redirect}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
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

export default Login;
