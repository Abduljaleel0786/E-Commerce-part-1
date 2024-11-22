import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Box, CircularProgress, Divider, Snackbar,
  SnackbarContent, TextField, Tooltip, Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch } from 'react-redux';
import { addToCart } from './Slices/add-cart/addCartSlice';

const Product = () => {
  const [CartList, setCartList] = useState([]);
  const [operAlert, setOperAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categoryOption, setCategoryOption] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartHandler = (product) => {
    const isExist = CartList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCartList((prev) => [...prev, product]);
    } else {
      setOperAlert(true);
    }
  };

  const handleClose = () => {
    setOperAlert(false);
  };

  const searchHandler = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  const categoryFilterHandler = (event, value) => {
    if (value) {
      const filtered = products.filter((product) => product.category === value.value);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status === 200) {
          setLoading(false);
          setProducts(response.data);
          setFilteredProducts(response.data);

          const uniqueCategories = [
            ...new Map(
              response.data.map((product) => [product.category, { label: product.category, value: product.category }])
            ).values(),
          ];
          setCategoryOption(uniqueCategories);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={operAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{ backgroundColor: "#bb2124" }}
          message={
            <Box sx={{ width: "100%" }} className="d-flex justify-content-between align-items-center">
              <span id="client-snackbar">Product is Already in Cart</span>
              <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
            </Box>
          }
        />
      </Snackbar>

      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <Box className="container text-center mt-4 mb-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <Box
                  className="card shadow-sm p-3"
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top img-fluid"
                    style={{
                      height: "150px",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
                      <AddShoppingCartIcon onClick={()=>dispatch(addToCart ())}
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
