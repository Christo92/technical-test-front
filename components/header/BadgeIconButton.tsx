import React from "react";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";

interface BadgeIconButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  count: number;
  badgeColor?: string;
}

const BadgeIconButton: React.FC<BadgeIconButtonProps> = ({
  href,
  onClick,
  icon,
  count,
  badgeColor = "black",
}) => {
  const button = (
    <IconButton onClick={onClick} size="large">
      {icon}
    </IconButton>
  );

  return (
    <Box sx={{ position: "relative" }}>
      {href ? <Link href={href} passHref>{button}</Link> : button}

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
