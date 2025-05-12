'use client';

import ProductCard from '@components/boutique/ProductCard';
import { Typography, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import GlobalContext from '@state/global-context';

// Typage du produit
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const getProducts = (): Product[] => {
  return [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: 'men clothing',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    // Autres produits...
  ];
};

const ProductList: React.FC = () => {
  const [products] = useState(getProducts());
  const context = useContext(GlobalContext);

  return (
    <>
      {/* Utilisation du sx au lieu de makeStyles */}
      <Typography
        sx={{
          marginBottom: 2, // Remplace theme.spacing(2) par un nombre direct
          fontSize: '22px',
        }}
      >
        Products in cart: {context.cart.length}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id}> {/* Utilisation de item xs={12} sm={6} md={4} */}
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
