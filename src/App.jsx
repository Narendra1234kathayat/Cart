import Navbar from "./component/navbar/Navbar.jsx";

import './App.css'

import ProductContainer from "./component/products/ProductContainer.jsx";
import { BrowserRouter, Routes ,Route} from "react-router-dom";
import Cart from "./component/CartPage/Cart.jsx";
import Login from "./component/UserAuth/Login.jsx";
import Signup from "./component/UserAuth/Signup.jsx";
import Profile from "./component/profile/Profile.jsx";
import Product from "./component/products/Product.jsx";

function App() {


  return (
    <>
     <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductContainer/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/signup" element={<Signup/>}/> 
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
      </BrowserRouter>
 
     
     </div>
    </>
  )
}

export default App
