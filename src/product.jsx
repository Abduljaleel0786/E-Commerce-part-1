import { Box, Divider, Snackbar, SnackbarContent, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Product = () => {
    const [CartList, setCartList] = useState([]);
    const [operAlert, setOperAlert] = useState(false);
    const [products, setProducts] = useState([]);

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
        const searchTerm = event?.target?.value.toLowerCase();
        if (searchTerm === "") {
            // setProducts(dummyProducts);
        } else {
            // const filteredProducts = dummyProducts.filter((product) =>
            //     product.name.toLowerCase().includes(searchTerm)
            // );
            // setProducts(filteredProducts);
        }
    };

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const products = await axios.get("https://fakestoreapi.com/products");
                setProducts(products?.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchproducts();
    }, []);

    return (
        <>
            <Box className="container mt-3">
                <TextField size='small'  placeholder='Search Items ...' fullWidth sx={{ mb: 2 }} />
            </Box>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={operAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: "#bb2124",
                    }}
                    message={
                        <Box sx={{ width: "100%" }} className="d-flex justify-content-between align-items-center">
                            <span id="client-snackbar">Product is Already in Cart</span>
                            <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                        </Box>
                    }
                />
            </Snackbar>

            <Box className="container text-center mt-4 mb-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {products.map((product) => (
                        <div key={product.id} className="col">
                            <Box
                                className="card shadow-sm p-3"
                                sx={{borderRadius: 2,  height: "100%",display: "flex", flexDirection:"column", justifyContent: "space-between"
                                }}
                            >
                                <img
                                    src={product?.image}
                                    alt={product.title}
                                    className="card-img-top img-fluid"
                                    style={{ height: "150px", objectFit: "contain" }}
                                />
                                <Tooltip title={product?.title} placement="top">
                                    <Typography variant="h6" className="card-title mt-2 text-truncate">
                                        {product?.title.length > 22 ? `${product.title.slice(0, 22)}...` : product?.title}
                                    </Typography>
                                </Tooltip>
                                <Divider className="mt-2 mb-2" />
                                <div className="d-flex justify-content-between">
                                    <Tooltip title="Product Details">
                                        <VisibilityIcon style={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title="Add to Favorites">
                                        <FavoriteIcon style={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title="Add to Cart">
                                        <AddShoppingCartIcon style={{ cursor: 'pointer' }} onClick={() => cartHandler(product)} />
                                    </Tooltip>
                                </div>
                            </Box>
                        </div>
                    ))}
                </div>
            </Box>
        </>
    );
};

export default Product;
