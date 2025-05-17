import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import welcomeBackground from "@assets/welcome-background.jpg";
import welcomeIcon from "@assets/welcome-icon.svg";
import WelcomeSection from "@components/welcomeCard/WelcomeSection";

const WelcomeCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        padding: isMobile ? 2 : "89px 79px",
        backgroundColor: "#FFFFFF",
        gap: isMobile ? 4 : 6,
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: isMobile ? "100%" : 600,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src={welcomeBackground}
          alt="SuperShop"
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
          priority
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <WelcomeSection
          imageSrc={welcomeIcon}
          imageAlt="icon"
          title="Un accompagnement sur-mesure"
          description="Blissim c’est une box mensuelle sans engagement, mais aussi des offres exclusives et un e-shop généreux. Profitez de nos conseils personnalisés et de nos vidéos accessibles gratuitement."
        />
        <WelcomeSection
          imageSrc={welcomeIcon}
          imageAlt="icon"
          title="10 ans d’expertise beauté"
          description="N°1 de l’abonnement beauté en Europe, Blissim c’est déjà plus de 250 000 clients déjà conquis. Label Trustpilot !"
        />
        <WelcomeSection
          imageSrc={welcomeIcon}
          imageAlt="icon"
          title="Nos engagements"
          description="Nous travaillons avec des partenaires beauté et des experts toujours plus engagés, pour vous proposer une sélection personnalisée de soins de qualité et le plus naturels possibles."
        />
      </Box>
    </Box>
  );
};

export default WelcomeCard;
