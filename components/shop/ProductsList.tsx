import ProductCard from "@components/shop/ProductCard";
import { Typography, Grid } from "@mui/material";
import { useContext, useState } from "react";
import GlobalContext from "@state/global-context";
import productsData from "@components/data/products.json";

// Typage du produit
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductListProps {
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
  const [products] = useState<Product[]>(productsData);
  const context = useContext(GlobalContext);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Typography
        sx={{
          marginBottom: 2,
          fontSize: "22px",
        }}
      >
        Products in cart: {context.cart.length}
      </Typography>
      <Grid container spacing={2}>
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
