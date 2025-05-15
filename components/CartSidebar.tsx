import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  SwipeableDrawer,
  Typography,
  Button,
  Card,
  IconButton,
  CardMedia,
  Grid,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalContext, { Product } from "@state/global-context";

const CartSidebar = () => {
  const context = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const theme = useTheme();

  const cart: Product[] = useMemo(() => context.cart || [], [context.cart]);

  const handleRemoveProduct = (id: number) => {
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
      onClose={() => context.pushObject("open_cartsidebar", false)}
      onOpen={() => context.pushObject("open_cartsidebar", true)}
      sx={{ width: "100%", maxWidth: 400 }}
    >
      <div
        style={{
          padding: theme.spacing(2),
          backgroundColor: "#f9f9f9",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <IconButton
              onClick={() => context.pushObject("open_cartsidebar", false)}
              size="large"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Shopping Cart</Typography>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          {cart.map((product, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                mb: 1,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                alt={product.title}
                image={product.image}
                sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
              />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid sx={{ paddingRight: "40px" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </Grid>
                <IconButton
                  onClick={() => handleRemoveProduct(product.id)}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Card>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: "#2979ff", textAlign: "right" }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 1 }}
        >
          Order
        </Button>
      </div>
    </SwipeableDrawer>
  );
};

export default CartSidebar;
