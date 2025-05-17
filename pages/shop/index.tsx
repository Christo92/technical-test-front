import DefaultLayout from '@components/DefaultLayout';
import {
  Container,
  Grid,
} from '@mui/material';
import ProductsList from '@components/shop/ProductsList';

/**
 * Shop page component.
 * Renders the shop layout with a container holding the list of products.
 */
const Shop = () => {
  return (
    <DefaultLayout>
      {/* Main container with a max width and bottom margin */}
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        {/* Grid container for layout spacing */}
        <Grid container spacing={3}>
          {/* Single Grid item wrapping the products list */}
          <Grid>
            <ProductsList />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default Shop;
