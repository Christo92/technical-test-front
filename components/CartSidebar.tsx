import React, { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import {
  SwipeableDrawer,
  Typography,
  Button,
  Card,
  IconButton,
  CardMedia,
  Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import GlobalContext from '@state/global-context';

// Typage minimal du produit (à adapter selon ta structure réelle)
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const CartSidebar = () => {
  const context = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const theme = useTheme();

  const cart: Product[] = useMemo(() => context.cart || [], [context.cart]);

  const handleRemoveProduct = (id: string) => {
    context.removeProductToCart(id);
  };

  const getTotalPrice = useCallback(() => {
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    setTotalPrice(total);
  }, [cart]);

  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice]);

  return (
    <SwipeableDrawer
      anchor="right"
      open={context.open_cartsidebar}
      onClose={() => context.pushObject('open_cartsidebar', false)}
      onOpen={() => context.pushObject('open_cartsidebar', true)}
    >
      <div style={{ width: '350px', padding: theme.spacing(2) }}>
        <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
          <Grid>
            <IconButton onClick={() => context.pushObject('open_cartsidebar', false)} size="large">
              <ArrowBackIcon color="secondary" />
            </IconButton>
          </Grid>
          <Grid>
            <Typography variant="h5">Mon panier</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid>
            <Typography>
              {cart.length > 1 ? `${cart.length} produits` : `${cart.length} produit`}
            </Typography>
          </Grid>

          {cart.map((product, index) => (
            <Grid key={index}>
              <Card sx={{ display: 'flex', padding: theme.spacing(2), position: 'relative' }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  sx={{
                    width: '100px',
                    height: 'auto',
                    maxHeight: '90px',
                    marginRight: theme.spacing(2)
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography>{product.title}</Typography>
                  <Typography>{product.price} euros</Typography>
                  <IconButton
                    onClick={() => handleRemoveProduct(product.id)}
                    sx={{ position: 'absolute', right: 0, bottom: 0 }}
                    size="large"
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography gutterBottom>
          Prix total : {totalPrice} {totalPrice > 1 ? 'euros' : 'euro'}
        </Typography>
        <Button color="primary" variant="contained">
          Commander
        </Button>
      </div>
    </SwipeableDrawer>
  );
};

export default CartSidebar;
