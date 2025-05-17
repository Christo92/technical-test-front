import { Button } from "@mui/material";
import GlobalContext, { Product } from "@state/global-context";
import { useContext } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

/**
 * AddToCartButton component
 *
 * A button that allows users to add a product to their shopping cart.
 *
 * Props:
 * - product: The product object to add to the cart.
 *
 * Features:
 * - Uses Material UI Button with a shopping basket icon.
 * - Font size set to 12px to keep the button compact.
 * - Uses global context to trigger the add-to-cart action.
 */
const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const { handleAddToCart } = useContext(GlobalContext); // Access the add to cart handler from global state

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ShoppingBasketIcon />}
      onClick={() => handleAddToCart(product)}
    >
      Ajouter au panier
    </Button>
  );
};

export default AddToCartButton;
