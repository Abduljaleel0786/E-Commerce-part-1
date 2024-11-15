import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';



const Cartlist = (props) => {
    const { open, toggleDrawer } = props;


    const [CartItems, SetCartItems] = useState();

    useEffect(() => {
        const CartItemArray = localStorage.getItem("CartList");
        const parsedCartItemArray = JSON.parse(CartItemArray);
        SetCartItems(parsedCartItemArray);
    }, []);


    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>

                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>




                    <Typography variant='h5'>Cart Items</Typography>
                    {CartItems?.map((items) => {
                        return <>

                            <Box>

                                <img width="100px" src={items.img} />
                                <span> {items.name}</span>
                                {/* <span> {items.price}</span> */}


                            </Box>
                          
                        </>

                    })
                    }
                </Box>

            </Drawer>
        </div>
    );
}

export default Cartlist;
