import ProductCard from "@components/shop/ProductCard";
import { Grid, CircularProgress, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "@state/global-context";
import productsData from "@data/products.json";
import { useRouter } from "next/router";

/**
 * ProductList component
 *
 * Displays a list of products filtered by category based on the URL query parameter.
 * Shows a loading spinner while filtering or waiting for router readiness.
 *
 * Features:
 * - Uses Next.js router to read the "category" query param.
 * - Filters products based on category, or shows all if category is "all" or missing.
 * - Displays a loading spinner until filtering is done and router is ready.
 * - Displays a grid of ProductCard components for the filtered products.
 */
const ProductList: React.FC = () => {
  const [products] = useState<Product[]>(productsData);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const router = useRouter();
  const { isReady, query } = router;
  const categoryQuery = (query.category as string)?.toLowerCase() ?? "all";

  useEffect(() => {
    if (!isReady) return;

    setLoading(true);

    // Filter products immediately based on category query
    const newFiltered =
      categoryQuery === "all"
        ? products
        : products.filter(
            (product) => product.category.toLowerCase() === categoryQuery
          );

    setFilteredProducts(newFiltered);
    setLoading(false);
  }, [isReady, categoryQuery, products]);

  if (!isReady || loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", marginTop: "40px" }}
    >
      {filteredProducts.map((product) => (
        <Grid key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
