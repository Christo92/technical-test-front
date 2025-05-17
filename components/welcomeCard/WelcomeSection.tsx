import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface WelcomeSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

/**
 * WelcomeSection component
 *
 * Displays a section with an icon, a title, and a description.
 *
 * Props:
 * - imageSrc: URL or import of the icon/image to display (string)
 * - imageAlt: alt text for the image (string)
 * - title: section title (string)
 * - description: section descriptive text (string)
 *
 * Layout:
 * - Horizontal flexbox with icon on the left and text on the right
 * - White background with padding and rounded corners
 */
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
      <Image src={imageSrc} alt={imageAlt} width={40} height={40} priority />
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
