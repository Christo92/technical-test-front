import React from "react";
import { Drawer, Box, Divider, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import BadgeIconButton from "@components/header/BadgeIconButton"; // adapte le chemin si besoin

interface MenuSidebarProps {
  open: boolean;
  onClose: () => void;
  wishlistCount: number;
  cartCount: number;
  onCartClick: () => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  open,
  onClose,
  wishlistCount,
  cartCount,
  onCartClick,
}) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" mb={2}>
          Menu
        </Typography>

        <Box
          onClick={onClose}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            cursor: "pointer",
          }}
        >
          <BadgeIconButton
            href="/wishlist"
            icon={<FavoriteBorderIcon />}
            count={wishlistCount}
            badgeColor="red"
          />
          <Typography component="span">Wishlist</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          onClick={() => {
            onCartClick();
            onClose();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <BadgeIconButton
            icon={<ShoppingBasketIcon />}
            count={cartCount}
            badgeColor="black"
          />
          <Typography component="span">Panier</Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MenuSidebar;
