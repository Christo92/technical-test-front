import ProductCard from "@components/shop/ProductCard";
import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import { Product } from "@state/global-context";
import productsData from "@data/products.json";
import { useRouter } from "next/router";

const ProductList: React.FC = () => {
  const [products] = useState<Product[]>(productsData);
  const router = useRouter();
  const categoryQuery =
    (router.query.category as string)?.toLowerCase() ?? "all";

  const filteredProducts =
    categoryQuery === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === categoryQuery
        );

  return (
    <>
      <Typography
        sx={{
          marginBottom: 2,
          fontSize: "22px",
        }}
      ></Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {filteredProducts.map((product) => (
          <Grid key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
