import ProductCard from "@components/shop/ProductCard";
import { Grid, CircularProgress, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "@state/global-context";
import productsData from "@data/products.json";
import { useRouter } from "next/router";

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

    const timeout = setTimeout(() => {
      const newFiltered =
        categoryQuery === "all"
          ? products
          : products.filter(
              (product) => product.category.toLowerCase() === categoryQuery
            );

      setFilteredProducts(newFiltered);
      setLoading(false);
    }, 400); // durée du faux "lazy loading"

    return () => clearTimeout(timeout);
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
