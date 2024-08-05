import React from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import { addproduct } from "../../Store/Slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Products = ({ product, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productAdd = (product) => {
    const sendData = {
      id: product.id,
      title: product.title,
      price: Math.ceil(product.price),
      quantity: 1,
      images: product.images[0],
    };
    toast.success("Product added successfully");
    dispatch(addproduct(sendData));
  };

  const HandleProductPage = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div className="mx-auto carddd p-3 w-full h-full" onClick={() => HandleProductPage(product)}>
        <Toaster />
        <div className="card image-full shadow-xl h-full my-2 w-full">
          <figure>
            <img
              src={product.images[0]}
              className="max-h-56 z-20 relative imagee"
              alt="Product"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p>
              {product.category}{" "}
              <span className="text-white-800 font-bold">
                ({product.brand})
              </span>
            </p>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
              <p className="sm:text-3xl text-green-600">
                <span className="text-white text-bold">Price</span>₹ {product.price}
              </p>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation(); 
                  productAdd(product);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
