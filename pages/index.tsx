import DefaultLayout from '@components/DefaultLayout';
import { Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const Home = () => {
  return (
    <DefaultLayout>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          SuperShop
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Something short and leading about the collection below—its contents, the creator, etc.
          Make it short and sweet, but not too short so folks don&apos;t simply skip over it
          entirely.
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid>
            <Link href="/shop" passHref>
              <Button variant="contained">
                La Boutique
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default Home;
