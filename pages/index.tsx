import DefaultLayout from "@components/DefaultLayout";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import homepageBackground from "../assets/homepage-background.jpg";
import WelcomeCard from "@components/welcomeCard/WelcomeCard";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Home = () => {
  // Scroll jusqu'en bas de la page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <DefaultLayout>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          color: "common.white",
          textAlign: "center",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "200px 25px",
        }}
      >
        <Image
          src={homepageBackground}
          alt="SuperShop background"
          fill
          style={{ objectFit: "cover" }}
          quality={90}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue chez <strong>SuperShop</strong>
          </Typography>
          <Typography variant="h6">
            Des vêtements tendances, des accessoires stylés et les derniers
            produits électroniques.
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
        <IconButton
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            sx={{
              position: "absolute",
              zIndex: 2,
              mt: 4,
              color: "common.white",
              animation: "bounce 2s infinite",
              fontSize: 40,
              bottom: "10%",
            }}
          >
            <KeyboardArrowDownIcon fontSize="inherit" />
          </IconButton>
      </Box>
      <WelcomeCard />
    </DefaultLayout>
  );
};

export default Home;
