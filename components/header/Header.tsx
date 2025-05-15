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
import CartSidebar from "@components/CartSidebar";

const Header: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    context.pushObject("open_cartsidebar", true);
  };

  const handleCategoryClick = (category: string) => {
    router.push({ pathname: "/shop", query: { category } });
    setDrawerOpen(false);
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
                <Image src={supershopLogo} alt="SuperShop Logo" height={40} />
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
                  <Box sx={{ position: "relative" }}>
                    <Link href="/wishlist" passHref>
                      <IconButton size="large">
                        <FavoriteBorderIcon color="secondary" />
                      </IconButton>
                    </Link>
                    {context.wishlist.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          right: 4,
                          backgroundColor: "red",
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
                        {context.wishlist.length}
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ position: "relative" }}>
                    <IconButton onClick={toggleDrawer} size="large">
                      <ShoppingBasketIcon color="secondary" />
                    </IconButton>
                    {context.cart.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          right: 4,
                          backgroundColor: "black",
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
                        {context.cart.length}
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                <IconButton onClick={toggleDrawer} size="large">
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <CartSidebar />
    </>
  );
};

export default Header;
