import DefaultLayout from '@components/DefaultLayout';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import homepageBackground from '../assets/homepage-background.jpg';

const Home = () => {
  return (
    <DefaultLayout>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'common.white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Image de fond */}
        <Image
          src={homepageBackground}
          alt="SuperShop background"
          fill
          style={{ objectFit: 'cover' }}
          quality={90}
          priority
        />
        {/* Overlay sombre */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        {/* Contenu */}
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue chez <strong>SuperShop</strong>
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey.300' }}>
            Des vêtements tendances, des accessoires stylés et les derniers produits électroniques.
            <br />
            Tout ce qu’il vous faut, en un seul endroit.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link href="/shop" passHref>
              <Button variant="contained" size="large" color="secondary">
                Explorer la Boutique
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </DefaultLayout>
  );
};

export default Home;
