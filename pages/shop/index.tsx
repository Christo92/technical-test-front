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

const categories = [
  { label: 'Tous', value: 'all' },
  { label: 'Électronique', value: 'electronics' },
  { label: 'Vêtements homme', value: 'men clothing' },
  { label: 'Vêtements femme', value: 'women clothing' },
  { label: 'Bijoux', value: 'jewelery' },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <DefaultLayout>
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Grid container justifyContent="center">
          <Typography variant="h3" component="h1" sx={{ my: 5 }}>
            SuperShop
          </Typography>
        </Grid>

        <Grid container spacing={3}>
          <Grid>
            <Typography
              variant="h6"
              sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', padding: 1 }}
            >
              Catégories
            </Typography>
            <List>
              {categories.map((cat) => (
                <ListItemButton
                  key={cat.value}
                  selected={selectedCategory === cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  sx={{ pl: 0 }}
                >
                  <ListItemText primary={cat.label} />
                </ListItemButton>
              ))}
            </List>
          </Grid>

          <Grid>
            <ProductsList selectedCategory={selectedCategory} />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default Shop;
