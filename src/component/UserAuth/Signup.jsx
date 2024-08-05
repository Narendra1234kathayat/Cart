import React, { useState } from 'react';
import axiosInstance from '../AxiosInterceptor/AxiosInterceptor';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Perform form validation here

      // Mock API call or any other logic
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      const res = await axiosInstance.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      console.log(res, "res");
      if (res.status === 200) {
        // Handle successful response here
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error.message);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black h-screen flex items-center justify-center">
        <div className="w-96 border-2 rounded-md border-white p-6 bg-gray-800 shadow-lg">
          <h1 className="text-center text-3xl text-white mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col text-white">
                <label className="text-xl mb-2" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-3 py-2 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col text-white">
                <label className="text-xl mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col text-white">
                <label className="text-xl mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Link className='text-blue-800 underline mt-5 text-xl' to="/login">Already registered login</Link>
              <button
                type="submit"
                className="bg-slate-500 w-full py-3 rounded-md text-2xl text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
