import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useContext } from "react";
import GlobalContext from "@state/global-context";

// Typage du produit
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(GlobalContext);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    context.addProductToCart(product);
    context.pushObject("open_cartsidebar", true);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <div>
          <CardMedia
            component="img"
            alt={product.title}
            image={product.image}
            sx={{
              maxHeight: "170px",
              width: "auto",
              margin: "auto",
            }}
            title={product.title}
          />
        </div>
        <Typography gutterBottom component="h2" sx={{ fontSize: "1rem" }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          {product.price}€
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={(e) => handleAddToCart(e, product)} size="large">
          <ShoppingBasketIcon color="secondary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
