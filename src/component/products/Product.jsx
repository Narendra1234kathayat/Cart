import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchProducts from '../hooks/useFetchProducts';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { addproduct } from "../../Store/Slices/cartSlice";
const Product = () => {
  const { id } = useParams();
  const { products, loading } = useFetchProducts();
  const filterproduct = products.find(product => product?.id === parseInt(id));
  const dispatch = useDispatch();

  const handlebuyproduct = (product) => {
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

  return (
    <div className='pt-28 container mx-auto bg-black text-white'>
      {loading && <p className=' bg-black text-white h-screen'>Loading...</p>}
      {filterproduct ? (
        <div>
          <Toaster/>
          <div className='product-detail grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='main-image'>
              <img src={filterproduct.images[0]} alt={filterproduct.title} className='w-full h-80 object-cover' />
              <div className='thumbnail-images flex space-x-2 mt-4 overflow-x-auto'>
                {filterproduct.images.map((image, index) => (
                  <div key={index} className='thumbnail'>
                    <img src={image} alt={`${filterproduct.title} ${index}`} className='h-28 w-28 object-cover cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>
            <div className='my-auto sm:px-0 px-5'>
              <h2 className='text-2xl text-gray-400 font-bold'>{filterproduct.title}</h2>
              <p className='text-gray-300 mt-2'>{filterproduct.description}</p>
              <p className='py-2'>
                <span className='text-red-400'>Discount: {filterproduct.discountPercentage}%</span>
                <span className='mx-2'>| Rating: {filterproduct.rating}</span>
                <span className='font-bold mx-2'>({filterproduct.brand})</span>
              </p>
              <p>Quantity: {filterproduct.stock}</p>
              <p className='text-xl font-bold text-green-600 mt-4'>Price: ₹ {filterproduct.price}</p>
              <button className='bg-green-500 px-4 py-2 rounded-md' onClick={()=>handlebuyproduct(filterproduct)}>BUY IT</button>

              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Additional Information</h3>
                <p><strong>SKU:</strong> {filterproduct.sku}</p>
                <p><strong>Weight:</strong> {filterproduct.weight} kg</p>
                <p><strong>Dimensions:</strong> {filterproduct.dimensions.width} x {filterproduct.dimensions.height} x {filterproduct.dimensions.depth} cm</p>
                <p><strong>Warranty:</strong> {filterproduct.warrantyInformation}</p>
                <p><strong>Shipping Information:</strong> {filterproduct.shippingInformation}</p>
                <p><strong>Availability:</strong> {filterproduct.availabilityStatus}</p>
                <p><strong>Return Policy:</strong> {filterproduct.returnPolicy}</p>
                <p><strong>Minimum Order Quantity:</strong> {filterproduct.minimumOrderQuantity}</p>
              </div>
            </div>
          </div>

          <div className='mt-4 mx-auto w-8/12 container py-10'>
            <h3 className='text-3xl font-semibold text-red-600'>Reviews</h3>
            {filterproduct.reviews.length > 0 ? (
              filterproduct.reviews.map((review, index) => (
                <div key={index} className='review border-b pb-2 mb-2'>
                  <p><strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()})</p>
                  <p>Rating: {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          
        </div>
      ) : (
        !loading && <p>Product not found</p>
      )}
    </div>
  );
}

export default Product;
