import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";

interface WelcomeSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function WelcomeSection({
  imageSrc,
  imageAlt,
  title,
  description,
}: WelcomeSectionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <Image src={imageSrc} alt={imageAlt} width={40} height={40} />
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
