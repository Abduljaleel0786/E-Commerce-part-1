import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Box, CircularProgress, Divider, TextField, Tooltip, Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from 'react-redux';
import { addproduct } from './Slices/product/productSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isToast, isProductAdded } = useSelector((state) => state.Products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await axios.get("https://fakestoreapi.com/products");

        if (productsData.status === 200) {
          setIsLoading(false);
          setAllProducts(productsData.data);
          setFilteredProducts(productsData.data);

          const uniqueCategories = [...new Set(productsData.data.map((p) => p.category))].map(category => ({
            label: category,
            value: category,
          }));
          setCategoryOption(uniqueCategories);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryFilter) {
      setFilteredProducts(allProducts.filter(product => product.category === categoryFilter));
    } else {
      setFilteredProducts(allProducts);
    }
  }, [categoryFilter, allProducts]);

  const searchHandler = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProducts(allProducts.filter(product =>
      product.title.toLowerCase().includes(value)
    ));
  };

  const categoryFilterHandler = (event, newValue) => {
    setCategoryFilter(newValue ? newValue.value : null);
  };

  useEffect(() => {
    if (isToast) {
      toast.warning("Product already added!");
    }
    if (isProductAdded) {
      toast.success("Product added Successfully!");
    }
  }, [isToast, isProductAdded]);

  return (
    <>
      <ToastContainer />
      <Box className="container d-flex justify-content-between align-items-center mt-3 gap-2">
        <TextField
          size="small"
          placeholder="Search Items..."
          onChange={searchHandler}
          sx={{ flex: 1 }}
        />
        <Autocomplete
          size="small"
          disablePortal
          options={categoryOption}
          onChange={categoryFilterHandler}
          sx={{ flex: 0.5 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </Box>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <Box className="container mt-4 mb-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <Box className="card shadow-sm p-3 rounded">
                  <Box>
                    <Swiper
                      autoplay={{ delay: 2500, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                      navigation={true}
                      modules={[Autoplay, Pagination, Navigation]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="card-img-top img-fluid rounded"
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="card-img-top img-fluid rounded"
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="card-img-top img-fluid rounded"
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Box>

                  <Tooltip title={product.title} placement="top">
                    <Typography
                      variant="h6"
                      className="card-title mt-2 text-truncate"
                      sx={{ fontSize: "1rem", fontWeight: "bold" }}
                    >
                      {product.title.length > 25 ? `${product.title.slice(0, 25)}...` : product.title}
                    </Typography>
                  </Tooltip>
                  <Divider className="mt-2 mb-2" />
                  <div className="d-flex justify-content-between">
                    <Tooltip title="View Details">
                      <VisibilityIcon
                        onClick={() => navigate(`/ProductDetails/${product.id}`)}
                        style={{ cursor: "pointer", color: "#1976d2" }}
                      />
                    </Tooltip>
                    <Tooltip title="Add to Favorites">
                      <FavoriteIcon
                        style={{ cursor: "pointer", color: "#e91e63" }}
                      />
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                      <AddShoppingCartIcon
                        onClick={() => dispatch(addproduct(product))}
                        style={{ cursor: "pointer", color: "#4caf50" }}
                      />
                    </Tooltip>
                  </div>
                </Box>
              </div>
            ))}
          </div>
        </Box>
      )}
    </>
  );
};

export default Product;
