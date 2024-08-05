import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInterceptor/AxiosInterceptor';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import the CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem("AuthToken")){
      navigate("/")
    }

  },[localStorage.getItem("AuthToken")])

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        username,
        password
      });
      console.log("fdasf",res)
      if (res.status === 200) {
        const data=res.data.token;
        const userdetail=res.data.finduser;
        console.log(data,userdetail);
        
        await localStorage.setItem("AuthToken",data )
        localStorage.setItem("userdetail",JSON.stringify(userdetail))
        await toast.success("Login successfully..");
        await navigate("/")

        
      } else {
        toast.error("Wrong credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <>
      
      <div className="bg-black h-screen flex items-center justify-center">
      <ToastContainer />
        <div className="w-80 border-2 rounded-md border-white p-6 bg-gray-800 shadow-lg">
          <h1 className="text-center text-3xl text-white mb-6">
            Login
          </h1>
          <form onSubmit={handleLoginSubmit}>
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
                  required
                  className="px-3 py-2 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col text-white">
                <label className="text-xl mb-1" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target?.value)}
                  required
                  autoComplete='true'
                  className="px-3 py-2 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Link className='text-blue-700 mt-1 underline' to="/signup">New user sign up</Link>
              <button
                type="submit"
                className="bg-slate-500 w-full py-2 rounded-md text-2xl text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
