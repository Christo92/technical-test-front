import React from "react";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";

interface BadgeIconButtonProps {
  href?: string; // Optional URL to navigate to when the icon is clicked
  onClick?: () => void; // Optional click handler
  icon: React.ReactNode; // Icon to display inside the button
  count: number; // Badge count to show (only shown if greater than 0)
  badgeColor?: string; // Optional background color of the badge (default is black)
}

/**
 * BadgeIconButton Component
 * -------------------------
 * A reusable icon button component with an optional numeric badge and link behavior.
 *
 * Features:
 * - Renders a Material UI IconButton.
 * - Displays a small circular badge showing a count.
 * - Can act as a link if `href` is provided.
 * - Badge is only shown if count > 0.
 *
 * Props:
 * - `href`: optional, navigates to a URL using Next.js `Link`.
 * - `onClick`: optional, click event handler.
 * - `icon`: React node (usually an icon component).
 * - `count`: number shown in the badge.
 * - `badgeColor`: optional custom badge background color.
 *
 * Example usage:
 * ```tsx
 * <BadgeIconButton
 *   icon={<ShoppingCartIcon />}
 *   count={3}
 *   href="/cart"
 * />
 * ```
 */
const BadgeIconButton: React.FC<BadgeIconButtonProps> = ({
  href,
  onClick,
  icon,
  count,
  badgeColor = "black",
}) => {
  // IconButton rendered with or without a wrapping link
  const button = (
    <IconButton onClick={onClick} size="large">
      {icon}
    </IconButton>
  );

  return (
    <Box sx={{ position: "relative" }}>
      {/* Wrap the button in a Next.js Link if href is provided */}
      {href ? <Link href={href} passHref>{button}</Link> : button}

      {/* Display the badge if count is greater than 0 */}
      {count > 0 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 4,
            right: 4,
            backgroundColor: badgeColor,
            color: "white",
            borderRadius: "50%",
            width: 18,
            height: 18,
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {count}
        </Box>
      )}
    </Box>
  );
};

export default BadgeIconButton;
