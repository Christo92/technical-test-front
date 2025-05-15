import { useState } from 'react';
import DefaultLayout from '@components/DefaultLayout';
import {
  Container,
  Grid,
  Typography,
  List,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import ProductsList from '@components/shop/ProductsList';

const Shop = () => {
  return (
    <DefaultLayout>
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid>
            <ProductsList />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default Shop;
