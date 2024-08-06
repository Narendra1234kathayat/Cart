import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const navbar = () => {
  const products=useSelector((state)=> state.cart.cart)
  const totalprice=useSelector((state)=> state.cart.totalPrice)
  const navigate=useNavigate()
 const userdetail=JSON.parse(localStorage.getItem("userdetail"))
 const profile= userdetail?.profile
 


  const handleLogout= () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("userdetail");
    if(!localStorage.getItem("AuthToken") || !localStorage.getItem("userdetail")){
      navigate("/login")

    }
    
  }
  useEffect(() => {
    if(!localStorage.getItem("AuthToken") || !localStorage.getItem("userdetail")){
      navigate("/login")

    }
  },[])

  
  

  return (
    <>
    <div className="navbar bg-base-100 fixed z-50">
   <div className="flex-1">
   <Link to="/"className="btn btn-ghost text-xl">Products....</Link>
  </div>
  <div className="flex-none">
    {userdetail ? <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">{products?.length}</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body ">
          <span className="text-lg font-bold text-black">{products?.length} Items</span>
          <span className="text-info">Subtotal: ₹{totalprice}</span>
          <div className="card-actions">
            <Link to="/cart">
            <button className="btn btn-primary btn-block">View cart</button></Link>
          </div>
        </div>
      </div>
    </div> : ""}
    {userdetail  ? <div className="dropdown dropdown-end">
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
           <img
            alt="Tailwind CSS Navbar component"
            src={profile}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        
        <li onClick={handleLogout}><a >Logout</a></li>
      </ul>
    </div>: "" }
  </div>
</div>
    </>
  )
}

export default navbar
