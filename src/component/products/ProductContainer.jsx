import React, { useEffect } from 'react';
import Products from './Products';
import useFetchProducts from '../hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';

const ProductContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("AuthToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const { loading, products, error } = useFetchProducts();

  if (loading) {
    return (
      <div className="pt-20 grid sm:grid-cols-1 md:grid-cols-3 gap-3 mx-auto bg-black h-screen">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="skeleton h-60 bg-gray-100 w-full"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-white bg-black h-screen sm:text-6xl text-center pt-20">something went wrong</div>;
  }

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-black h-full pt-16 container mx-auto'>
      {products?.map((product) => (
        <Products key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductContainer;
