import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  removeproduct,
  increaseQuantity,
  reduceQuantity,
} from "../../Store/Slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();

  const handleclearallitems = (product) => {
    dispatch(removeproduct(product));
  };

  const increasequantity = (product) => {
    dispatch(increaseQuantity(product));
  };

  const decreasequantity = (product) => {
    dispatch(reduceQuantity(product));
  };

  const cartproducts = useSelector((state) => state.cart);

  return (
    <div className="pt-20 bg-black h-screen">
      <div className="mx-auto w-10/12">
        {cartproducts.cart.length > 0 ? (
          cartproducts.cart.map((cartproduct) => (
            <div
              className="grid grid-cols-4 my-1 w-8/12 mx-auto border-white border-2 p-2 rounded-md text-white "
              key={cartproduct.id}
            >
              <h1 className="text-2xl font-bold my-auto ">
                {cartproduct.title}
              </h1>
              <img
                src={cartproduct.images}
                className="h-20 w-20 bg-white"
                alt={cartproduct.title}
              />
              <h1 className="mx-2 text-2xl font-bold my-auto text-green-200">
                ₹{cartproduct.price}
              </h1>
              <div className="flex justify-center align-middle">
                <span
                  className="px-3 py-2 mx-2 text-3xl my-auto"
                  onClick={() => increasequantity(cartproduct)}
                >
                  <IoIosAddCircle />
                </span>
                <span className="w-5 my-auto">{cartproduct.quantity}</span>
                <span
                  className="px-3 py-2 mx-2 my-auto text-3xl"
                  onClick={() => decreasequantity(cartproduct)}
                >
                  <AiFillMinusCircle />
                </span>
                <span
                  className="text-3xl my-auto text-red-600"
                  onClick={() => handleclearallitems(cartproduct)}
                >
                  <MdDeleteForever />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="pt-32 text-3xl z-30 text-white mx-auto text-center">
            Your cart is empty
          </div>
        )}
      </div>
      <div className="mx-auto w-10/12 flex justify-end ">
      <div className="text-3xl text-white font-bold m-3 w-fit bg-red-700 p-3 rounded-sm">Total price- Rs {cartproducts?.totalPrice}/.</div>
      </div>
      
    </div>
  );
};

export default Cart;
