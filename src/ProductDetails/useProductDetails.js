import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const useProductDetails = () => {
    const param = useParams();
    const [productsDetail, setProductsDetail] = useState({});
    const [isLoading, setloading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setloading(true);
                const productsData = await axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);
                if (productsData.status === 200) {
                    setloading(false);
                    setProductsDetail(productsData?.data);
                } else {
                    setloading(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, [param]);

    return { productsDetail, setProductsDetail, isLoading, setloading }
}

export default useProductDetails