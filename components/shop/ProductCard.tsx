import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useContext } from "react";
import GlobalContext, { Product } from "@state/global-context";
import AddToWishlistButton from "@components/shop/AddToWishlistButton";
import AddToCartButton from "@components/shop/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(GlobalContext);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        mb: 2,
        borderRadius: "5px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: 600,
        height: "auto",
        margin: "auto",
      }}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box sx={{ position: "absolute", top: 8, left: 8 }}>
          <AddToWishlistButton productId={product.id} />
        </Box>
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            maxHeight: 200,
            borderRadius: "8px",
            mb: 2,
            mx: "auto",
            mt: 2,
            display: "block",
          }}
        />
      </Box>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ color: "#2979ff" }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <AddToCartButton product={product} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
