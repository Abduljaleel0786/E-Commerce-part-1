import { Box, CircularProgress, Grid, Typography, Chip, IconButton } from '@mui/material';
import { AddShoppingCart, Share, Favorite } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header';

const ProductDetails = () => {
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

    return (
        <>
            <Header />
            <Box
                sx={{ background: 'linear-gradient(to bottom, #f0f0f0, #ffffff)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}
            >
                {isLoading ? (
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                        <CircularProgress size="4rem" sx={{ color: '#0d47a1' }} />
                    </Box>
                ) : (
                    <Grid
                        container
                        spacing={4}
                        sx={{
                            maxWidth: '1200px',
                            margin: 'auto',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '15px',
                            padding: '30px',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >

                        <Grid
                            item
                            md={6}
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                            }}
                        >
                            <img
                                width="100%"
                                height="auto"
                                src={productsDetail?.image}
                                alt={productsDetail?.title}
                                style={{
                                    maxWidth: '350px',
                                    border: '1px solid #ddd',
                                    borderRadius: '10px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            />
                        </Grid>


                        <Grid item md={6} xs={12} sx={{ padding: '20px' }}>
                            <Chip
                                label={productsDetail?.category}
                                color="primary"
                                variant="outlined"
                                sx={{
                                    fontSize: '16px',
                                    marginBottom: '20px',
                                    padding: '8px 15px',
                                    backgroundColor: '#e3f2fd',
                                    color: '#0d47a1',
                                    fontWeight: 'bold',
                                }}
                            />
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ color: '#0d47a1', fontSize: '28px' }}
                            >
                                {productsDetail?.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    marginBottom: '20px',
                                    lineHeight: '1.8',
                                    fontSize: '16px',
                                    color: '#555',
                                }}
                            >
                                {productsDetail?.description}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    marginBottom: '15px',
                                    color: '#388e3c',
                                }}
                            >
                                Price: ${productsDetail?.price}
                            </Typography>


                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '30px',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton
                                    color="primary"
                                    sx={{
                                        fontSize: '2rem',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        '&:hover': { backgroundColor: '#0d47a1', color: '#fff' },
                                    }}
                                >
                                    <AddShoppingCart />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    sx={{
                                        fontSize: '2rem',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        '&:hover': { backgroundColor: '#f44336', color: '#fff' },
                                    }}
                                >
                                    <Favorite />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    sx={{
                                        fontSize: '2rem',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        '&:hover': { backgroundColor: '#1976d2', color: '#fff' },
                                    }}
                                >
                                    <Share />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default ProductDetails;
