import React, { useContext, useState, useCallback, useEffect } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import GlobalContext from "@state/global-context";
import ConfirmDeleteDialog from "@components/shop/ConfirmDeleteDialog";

/**
 * CartSidebar component
 *
 * Displays a sidebar drawer containing the shopping cart details.
 *
 * Features:
 * - Shows a list of products currently in the cart with their quantity and price.
 * - Allows incrementing and decrementing product quantity.
 * - Allows removing individual products from the cart.
 * - Displays total price of the cart dynamically.
 * - Includes a confirmation dialog to clear the entire cart.
 * - Responsive drawer with swipeable open/close behavior.
 *
 * Uses global context for cart state management.
 */
const CartSidebar = () => {
  const context = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const theme = useTheme();

  // Access the cart array from global context (array of CartItem)
  const cart = context.cart;

  /**
   * Calculates total price of all products in the cart.
   * Uses useCallback to memoize the function and avoid unnecessary recalculations.
   */
  const getTotalPrice = useCallback(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  // Recalculate total price whenever cart changes
  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice]);

  /**
   * Remove a product from the cart by its ID.
   * @param id - Product ID to remove.
   */
  const handleRemoveProduct = (id: number) => {
    context.removeProductToCart(id);
  };

  /**
   * Confirm and clear the entire cart.
   * Closes the confirmation dialog after clearing.
   */
  const handleConfirmDeleteAll = () => {
    context.clearCart();
    setConfirmDeleteOpen(false);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={context.open_cartsidebar}
        onClose={() => context.pushObject("open_cartsidebar", false)}
        onOpen={() => context.pushObject("open_cartsidebar", true)}
        PaperProps={{
          sx: {
            width: {
              xs: "100vw",
              sm: 400,
            },
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Cart content container */}
        <div
          style={{
            padding: theme.spacing(2),
            backgroundColor: "#f9f9f9",
            flex: 1,
            overflowY: "auto",
          }}
        >
          {/* Header: back button, title, and clear cart button */}
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
            <Typography variant="h6">Panier</Typography>
            {cart.length > 0 && (
              <Button
                onClick={() => setConfirmDeleteOpen(true)}
                color="error"
                size="small"
              >
                Tout supprimer
              </Button>
            )}
          </Grid>
          <Divider sx={{ mb: 2 }} />

          {/* List of cart items */}
          {cart.map(({ product, quantity }) => (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                mb: 1,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                position: "relative",
                paddingRight: "45px",
              }}
            >
              <CardMedia
                component="img"
                alt={product.title}
                image={product.image}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  mr: 2,
                  alignSelf: "center",
                }}
              />
              <Grid container>
                <Grid>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)} × {quantity}
                  </Typography>
                </Grid>
                <Grid sx={{ mt: 1 }}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid>
                      <IconButton
                        onClick={() =>
                          context.decrementProductQuantity(product.id)
                        }
                        size="small"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid>
                      <Typography>{quantity}</Typography>
                    </Grid>
                    <Grid>
                      <IconButton
                        onClick={() =>
                          context.incrementProductQuantity(product.id)
                        }
                        size="small"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Remove product button */}
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
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Total price display */}
          <Typography
            variant="h6"
            sx={{ color: "#2979ff", textAlign: "right" }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </div>

        {/* Sticky Order Button at bottom */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#f9f9f9",
            padding: theme.spacing(2),
            borderTop: "1px solid #ddd",
          }}
        >
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
            Commander
          </Button>
        </div>
      </SwipeableDrawer>

      {/* Confirmation dialog for deleting all items in cart */}
      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDeleteAll}
      />
    </>
  );
};

export default CartSidebar;
