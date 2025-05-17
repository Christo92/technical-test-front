import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Box,
  Typography,
  useMediaQuery,
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
import MenuSidebar from "@components/menusidebar/MenuSidebar"; // <-- importer
import BadgeIconButton from "./BadgeIconButton";

const Header: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  // State pour ouvrir sidebar menu burger
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);

  // Toujours gérer ouverture CartSidebar via contexte (desktop uniquement)
  const toggleCartSidebar = () => {
    context.pushObject("open_cartsidebar", true);
  };

  const handleCategoryClick = (category: string) => {
    router.push({ pathname: "/shop", query: { category } });
    setMenuSidebarOpen(false);
  };

  const categories = Array.from(
    new Set(productsData.map((p) => p.category.toUpperCase()))
  );

  const selectedCategory = (router.query.category as string)?.toUpperCase();

  return (
    <>
      <header>
        <AppBar position="static" elevation={0} color="inherit">
          <Container maxWidth="lg">
            <Toolbar
              sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
            >
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

              {!isSmallScreen && (
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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
              )}

              {!isSmallScreen ? (
                <Box sx={{ display: "flex", gap: 2 }}>
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
              ) : (
                // Menu burger ouvre MenuSidebar au lieu du CartSidebar
                <IconButton
                  onClick={() => setMenuSidebarOpen(true)}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </header>

      {/* Sidebar du panier (desktop) */}
      <CartSidebar />

      {/* Sidebar du menu burger (mobile) */}
      <MenuSidebar
        open={menuSidebarOpen}
        onClose={() => setMenuSidebarOpen(false)}
        wishlistCount={context.wishlist.length}
        cartCount={context.cart.length}
        onCartClick={() => {
          setMenuSidebarOpen(false); // Fermer la sidebar menu
          context.pushObject("open_cartsidebar", true); // Ouvrir le panier
        }}
      />
    </>
  );
};

export default Header;
