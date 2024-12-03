import { Button, ButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { decreaseQuantity, increaseQuantity, removeproduct } from './Slices/product/productSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Cartlist = (props) => {
    const { open, toggleDrawer } = props;
    const { items } = useSelector((state) => state.Products);
    const dispatch = useDispatch();

    const totalPrice = items.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="left">
            <Box  sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: { xs: '100%', sm: 340 }, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Cart Items
                    </Typography>
                    <Button onClick={toggleDrawer(false)} sx={{ minWidth: 0 }}>
                        <CloseIcon fontSize="medium" />
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: 2 }}>
                    {!items.length ? (
                        <Typography
                            variant="h6"
                            sx={{ textAlign: 'center', color: 'text.secondary' }}
                        >
                            Nothing to show!
                        </Typography>
                    ) : (
                        items.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 2,
                                    padding: 1,
                                    bgcolor: 'grey.100',
                                    borderRadius: 1,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        width="40px"
                                        src={item.image}
                                        alt={item.title}
                                        style={{ borderRadius: '4px' }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ marginLeft: 2, fontWeight: 'medium' }}
                                    >
                                        {item.title.length > 22
                                            ? `${item.title.slice(0, 15)}...`
                                            : item.title}
                                    </Typography>
                                </Box>

                                <ButtonGroup size="small" variant="text">
                                    <Button onClick={() => dispatch(decreaseQuantity(item))}>
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button disabled>{item.quantity}</Button>
                                    <Button onClick={() => dispatch(increaseQuantity(item))}>
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>

                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    ${item.price}
                                </Typography>

                                <Button
                                    onClick={() => dispatch(removeproduct(item))}
                                    sx={{ minWidth: 0 }}
                                >
                                    <HighlightOffIcon fontSize="small" color="error" />
                                </Button>
                            </Box>
                        ))
                    )}
                </Box>

                <Box
                    sx={{
                        padding: 2,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Total Price:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        ${totalPrice.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Cartlist;