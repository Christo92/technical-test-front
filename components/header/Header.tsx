import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from "next/link";
import CartSidebar from "@components/CartSidebar";
import GlobalContext from "@state/global-context";

const Header: React.FC = () => {
  const context = useContext(GlobalContext);

  const toggleDrawer = () => {
    context.pushObject("open_cartsidebar", true);
  };

  return (
    <>
      <header>
        <AppBar position="static" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar
              sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
            >
              <Link
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h4">SuperShop</Typography>
              </Link>
              <IconButton onClick={toggleDrawer} size="large">
                <ShoppingBasketIcon color="secondary" />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <CartSidebar />
    </>
  );
};

export default Header;
