import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Box, CircularProgress, Divider,TextField, Tooltip, Typography
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

const Product = () => {
  const [operAlert, setOperAlert] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isToast } = useSelector((state)=> state.Products);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await axios.get("https://fakestoreapi.com/products");

        if (productsData.status === 200) {
          setIsLoading(false);
          setAllProducts(productsData.data);
          setFilteredProducts(productsData.data);

          const filterCategories = productsData.data.map((product) => ({
            label: product.category,
            value: product.category,
          }));
          const uniqueCategories = filterCategories.filter(
            (item, index, self) => index === self.findIndex((i) => i.value === item.value)
          );
          setCategoryOption(uniqueCategories);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
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
      toast("Product already added!");
    }
  }, [isToast])

  return (
    <>
      <ToastContainer />
      <Box className="container d-flex justify-content-between mt-3">
        <TextField
          size="small"
          placeholder="Search Items ..."
          onChange={searchHandler}
          sx={{ mb: 2 }}
        />
        <Autocomplete
          size="small"
          disablePortal
          options={categoryOption}
          onChange={categoryFilterHandler}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </Box>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <Box className="container text-center mt-4 mb-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <Box className="card shadow-sm p-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top img-fluid"
                    style={{ height: "150px", objectFit: "contain" }}
                  />
                  <Tooltip title={product.title} placement="top">
                    <Typography variant="h6" className="card-title mt-2 text-truncate">
                      {product.title.length > 22 ? `${product.title.slice(0, 22)}...` : product.title}
                    </Typography>
                  </Tooltip>
                  <Divider className="mt-2 mb-2" />
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Product Details">
                      <VisibilityIcon
                        onClick={() => navigate(`/ProductDetails/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                    <Tooltip title="Add to Favorites">
                      <FavoriteIcon style={{ cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                      <AddShoppingCartIcon
                        onClick={() => dispatch(addproduct(product))}
                        style={{ cursor: 'pointer' }}
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
