import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * Footer Component
 * ----------------
 * A simple footer component that uses Material UI's theming system.
 *
 * Features:
 * - Applies background and padding from the current MUI theme.
 * - Displays a centered copyright notice.
 * - Automatically updates the year dynamically.
 *
 * Usage:
 * ```tsx
 * <Footer />
 * ```
 */
const Footer: React.FC = () => {
  // Access the current Material UI theme to apply consistent styling
  const theme = useTheme();

  return (
    <footer
      style={{
        // Sets the background color using the theme's paper background
        backgroundColor: theme.palette.background.paper,

        // Adds vertical and horizontal padding based on the theme's spacing scale
        padding: theme.spacing(6),
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {/* Displays the copyright with the current year */}
        {"Copyright © "}SuperSite {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;
