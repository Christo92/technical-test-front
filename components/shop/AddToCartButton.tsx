import { Button } from "@mui/material";
import GlobalContext, { Product } from "@state/global-context";
import { useContext } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const { handleAddToCart } = useContext(GlobalContext);

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

export default AddToCartButton
