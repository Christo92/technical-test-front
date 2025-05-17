import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Box,
  Typography,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import GlobalContext from "@state/global-context";
import productsData from "@data/products.json";
import supershopLogo from "@assets/supershop-logo.png";
import CartSidebar from "@components/shop/CartSidebar";
import MenuSidebar from "@components/menusidebar/MenuSidebar";
import BadgeIconButton from "./BadgeIconButton";

/**
 * Header component
 *
 * Displays the top navigation bar including the logo, category links, cart and wishlist icons,
 * and a hamburger menu for mobile.
 *
 * Features:
 * - Responsive layout with desktop menu and mobile hamburger menu.
 * - Category filtering by clicking on category names, updates the shop page query.
 * - Badge counters on wishlist and cart icons reflecting their respective counts from global context.
 * - Toggles cart sidebar visibility from global context.
 *
 * Uses:
 * - Material UI components for layout and styling.
 * - Next.js router for navigation.
 * - GlobalContext for cart and wishlist state management.
 * - Product data JSON to dynamically generate categories.
 */
const Header: React.FC = () => {
  const context = useContext(GlobalContext); // Access global app state (cart, wishlist, etc.)
  const router = useRouter(); // Router for navigation and query handling

  // Local state to control the visibility of the mobile menu sidebar
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);

  // Open the cart sidebar by updating the global context state
  const toggleCartSidebar = () => {
    context.pushObject("open_cartsidebar", true);
  };

  /**
   * Handles clicking on a category in the menu
   * Navigates to the /shop page with the selected category as a query param
   * Also closes the mobile menu sidebar if open
   *
   * @param category - The category string clicked by the user
   */
  const handleCategoryClick = (category: string) => {
    router.push({ pathname: "/shop", query: { category } });
    setMenuSidebarOpen(false);
  };

  // Extract unique categories from the products data (uppercase for consistency)
  const categories = Array.from(
    new Set(productsData.map((p) => p.category.toUpperCase()))
  );

  // Currently selected category from URL query, converted to uppercase for comparison
  const selectedCategory = (router.query.category as string)?.toUpperCase();

  return (
    <>
      <header>
        <AppBar position="static" elevation={0} color="inherit">
          <Container maxWidth="lg">
            <Toolbar
              sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
            >
              {/* Logo linking to home */}
              <Link
                href="/"
                passHref
                style={{ display: "flex", alignItems: "center" }}
              >
                <Image
                  src={supershopLogo}
                  alt="SuperShop Logo"
                  height={40}
                  priority
                />
              </Link>

              {/* Desktop category menu, hidden on small screens */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 3,
                  alignItems: "center",
                }}
              >
                {categories.map((category, i) => {
                  const isSelected = category === selectedCategory;
                  return (
                    <Typography
                      key={i}
                      variant="body2"
                      onClick={() => handleCategoryClick(category)}
                      sx={{
                        cursor: "pointer",
                        fontWeight: isSelected ? "bold" : 400,
                        color: isSelected ? "text.primary" : "text.secondary",
                        textTransform: "uppercase",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {category}
                    </Typography>
                  );
                })}
              </Box>

              {/* Desktop icons for wishlist and cart, hidden on small screens */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 2,
                }}
              >
                <BadgeIconButton
                  href="/wishlist"
                  icon={<FavoriteBorderIcon color="secondary" />}
                  count={context.wishlist.length}
                  badgeColor="red"
                />
                <BadgeIconButton
                  onClick={toggleCartSidebar}
                  icon={<ShoppingBasketIcon color="secondary" />}
                  count={context.cart.length}
                  badgeColor="black"
                />
              </Box>

              {/* Mobile hamburger menu button, shown only on small screens */}
              <IconButton
                onClick={() => setMenuSidebarOpen(true)}
                size="large"
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </header>

      {/* Cart sidebar component (desktop) */}
      <CartSidebar />

      {/* Mobile menu sidebar component */}
      <MenuSidebar
        open={menuSidebarOpen}
        onClose={() => setMenuSidebarOpen(false)}
        wishlistCount={context.wishlist.length}
        cartCount={context.cart.length}
        onCartClick={() => {
          setMenuSidebarOpen(false);
          context.pushObject("open_cartsidebar", true);
        }}
        categories={categories}
        onCategorySelect={handleCategoryClick}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default Header;
