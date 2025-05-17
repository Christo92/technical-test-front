import React from "react";
import {
  Drawer,
  Box,
  Divider,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import BadgeIconButton from "@components/header/BadgeIconButton";
import Link from "next/link";

interface MenuSidebarProps {
  open: boolean;
  onClose: () => void;
  wishlistCount: number;
  cartCount: number;
  onCartClick: () => void;
  categories: string[];
  onCategorySelect: (category: string) => void;
  selectedCategory?: string;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  open,
  onClose,
  wishlistCount,
  cartCount,
  onCartClick,
  categories,
  onCategorySelect,
  selectedCategory,
}) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" mb={2}>
          Menu
        </Typography>

        {/* Categories list */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Catégories
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItemButton
                key={category}
                selected={
                  category.toLowerCase() === selectedCategory?.toLowerCase()
                }
                onClick={() => {
                  onCategorySelect(category);
                  onClose();
                }}
                sx={{ textTransform: "uppercase" }}
              >
                {category}
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

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
          <Link href="/wishlist" passHref>
            <Typography component="span">Wishlist</Typography>
          </Link>
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
