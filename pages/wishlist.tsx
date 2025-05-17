import DefaultLayout from "@components/DefaultLayout";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useContext } from "react";
import GlobalContext from "@state/global-context";
import productsData from "@data/products.json";
import AddToWishlistButton from "@components/shop/AddToWishlistButton";
import { useTheme } from "@mui/material/styles";
import AddToCartButton from "@components/shop/AddToCartButton";

const WishlistPage = () => {
  const { wishlist } = useContext(GlobalContext);
  const productsInWishlist = productsData.filter((product) =>
    wishlist.includes(product.id)
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DefaultLayout>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Ma Wishlist
        </Typography>
        {productsInWishlist.length === 0 ? (
          <Typography variant="body1">Votre wishlist est vide.</Typography>
        ) : (
          <TableContainer>
            <Table
              sx={{
                width: "100%",
                tableLayout: "auto",
              }}
              aria-label="wishlist table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product Name</TableCell>
                  {!isMobile && <TableCell>Unit Price</TableCell>}
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsInWishlist.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <AddToWishlistButton productId={product.id} />
                    </TableCell>
                    <TableCell>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid>
                          <Box
                            component="img"
                            src={product.image}
                            alt={product.title}
                            sx={{ width: 50, height: 50, borderRadius: 1 }}
                          />
                        </Grid>
                        <Grid
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          {product.title}
                        </Grid>
                      </Grid>
                    </TableCell>
                    {!isMobile && (
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                    )}
                    <TableCell align="right">
                      <AddToCartButton product={product} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default WishlistPage;
