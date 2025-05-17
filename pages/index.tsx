import { useEffect, useState } from "react";
import DefaultLayout from "@components/DefaultLayout";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import homepageBackground from "@assets/homepage-background.jpg";
import WelcomeCard from "@components/welcomeCard/WelcomeCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Home = () => {
  // State to detect when component is mounted (avoid SSR/CSR mismatch)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return nothing until component is mounted
  if (!isMounted) return null;

  // Smooth scroll function to bottom of the page
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
          justifyContent: "space-between",
          flexDirection: "column",
          textAlign: "center",
          overflow: "hidden",
          color: "common.white",
          padding: {
            xs: "80px 15px",
            sm: "120px 20px",
            md: "200px 25px",
          },
          minHeight: "100vh", // Prevent layout shifts
        }}
      >
        {/* Full-page background image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
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
          {/* Dark overlay for text contrast */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        </Box>

        {/* Main content above the image */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue sur <strong>SuperShop</strong>
          </Typography>
          <Typography variant="h6">
            Des vêtements tendance, des accessoires stylés et les dernières
            nouveautés électroniques.
            <br />
            Tout ce dont vous avez besoin, en un seul endroit.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link href="/shop" passHref>
              <Button variant="contained" size="large" color="secondary">
                Explorez la boutique
              </Button>
            </Link>
          </Box>
        </Container>

        {/* Floating button to scroll down */}
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

      {/* Additional component at the bottom of the page */}
      <WelcomeCard />
    </DefaultLayout>
  );
};

export default Home;
