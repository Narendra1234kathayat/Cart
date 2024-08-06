
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../AxiosInterceptor/AxiosInterceptor";

const useFetchProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get("https://dummyjson.com/products");
                setProducts(res.data.products);
              //  console.log(res.data.products)
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    return { loading, products, error };
};

export default useFetchProducts;
