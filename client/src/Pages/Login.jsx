import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkUserProfile = async (firebaseUID) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${firebaseUID}`
    );
    const data = await res.json();
    return data?.profileComplete;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUID = userCredential.user.uid;

      const hasProfile = await checkUserProfile(firebaseUID);
      if (hasProfile) {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
      console.log("✅ Logged in!");
      
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const firebaseUID = result.user.uid;

      console.log("✅ Logged in with Google!");

      const hasProfile = await checkUserProfile(firebaseUID);
      if (hasProfile) {
        navigate("/dashboard");
      } else {
        navigate("/create-profile");
      }
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#624eff] via-[#988aff]   to-white p-4">
      {/* Decorative SVG Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,200 Q300,100 600,300 T1200,200 V800 H0 Z"
            fill="#624eff"
          />
          <path
            d="M0,400 Q300,300 600,500 T1200,400 V800 H0 Z"
            fill="#624eff"
          />
          <circle cx="200" cy="100" r="80" fill="#624eff" />
          <circle cx="1000" cy="200" r="120" fill="#624eff" />
        </svg>
      </div>

      <div className="relative z-10 flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Decorative Area */}
        <div className="hidden md:flex md:w-1/2 bg-white flex-col items-center justify-center text-white">
          <div className="w-[450px] h-[450px]">
            <img
              src="logo.png "
              className=" rounded-full border-none bg-black w-[450px] h-[450px] "
              alt=""
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full  md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#c14af9]">Hello!</h2>
            <p className="text-gray-500 mt-2">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-3 top-3 text-[#624eff]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-white border-none   rounded-xl  shadow-lg   focus:outline-0 focus:ring-0 focus:ring-purple-300 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative ">
              <div className="absolute left-3 top-2 text-[#624eff] shadow-4xl shadow-black">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-white  focus:outline-none focus:ring-0 shadow-2xl rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember" className="ml-2 text-gray-600">
                  Remember me
                </label>
              </div>
              <div className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer">
                Forgot password?
              </div>
            </div>

            <div
              onClick={handleLogin}
              className="w-full py-3 bg-[#624eff]   text-white  font-medium rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors text-center cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </div>
          </div>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 absolute w-full"></div>
              <div className="bg-white px-4 relative z-10 text-sm text-gray-500">
                or continue with
              </div>
            </div>

            <div
              onClick={handleGoogleLogin}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-medium hover:text-purple-800 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
