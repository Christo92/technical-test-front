import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Skeleton,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { Product } from "@state/global-context";
import AddToWishlistButton from "@components/shop/AddToWishlistButton";
import AddToCartButton from "@components/shop/AddToCartButton";

interface ProductCardProps {
  /** The product object to display */
  product: Product;
}

/**
 * ProductCard component
 *
 * Displays a product with its image, title, description, price,
 * and action buttons for adding to wishlist and to the shopping cart.
 *
 * Features:
 * - Shows a loading skeleton with fade while the product image loads.
 * - Fade-in effect on the product image once loaded.
 * - AddToWishlistButton positioned on top-left of the image.
 * - AddToCartButton below product details.
 *
 * Props:
 * - product: The Product object to be rendered.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loaded, setLoaded] = useState(false);

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
      <Box sx={{ position: "relative", width: "100%", height: 200 }}>
        <Box sx={{ position: "absolute", top: 8, left: 8, zIndex: 2 }}>
          <AddToWishlistButton productId={product.id} />
        </Box>

        {/* Loading skeleton with fade-out */}
        {!loaded && (
          <Fade in={!loaded} timeout={300}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                borderRadius: "8px",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </Fade>
        )}

        {/* Image with fade-in */}
        <Fade in={loaded} timeout={500}>
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            onLoad={() => setLoaded(true)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              position: "relative",
              zIndex: 1,
              display: "block",
              transition: "opacity 0.3s ease-in",
              opacity: loaded ? 1 : 0,
              mt: 2,
              mb: 2,
            }}
          />
        </Fade>
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
