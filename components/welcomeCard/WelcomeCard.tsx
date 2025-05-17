import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Fade } from "@mui/material";
import Image from "next/image";
import welcomeBackground from "@assets/welcome-background.jpg";
import welcomeIcon from "@assets/welcome-icon.svg";
import WelcomeSection from "@components/welcomeCard/WelcomeSection";

/**
 * WelcomeCard component
 *
 * Displays a welcome section with a background image and multiple info sections.
 *
 * Features:
 * - Responsive layout: stacks vertically on small screens, horizontal on larger.
 * - Uses MUI's `useTheme` and `useMediaQuery` for responsive behavior.
 * - Background image fades in smoothly after loading.
 * - Contains multiple `WelcomeSection` components displaying icons, titles, and descriptions.
 */
const WelcomeCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loaded, setLoaded] = useState(false);

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
      {/* Background image with fade-in effect */}
      <Box
        sx={{
          flexShrink: 0,
          width: isMobile ? "100%" : 600,
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Fade in={loaded} timeout={600}>
          <Box sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
            <Image
              src={welcomeBackground}
              alt="SuperShop"
              onLoad={() => setLoaded(true)}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
                display: "block",
              }}
              priority
            />
          </Box>
        </Fade>
      </Box>

      {/* Multiple welcome sections with icons and text */}
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
