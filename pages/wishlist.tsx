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
  Grid,
  Box,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useContext } from "react";
import GlobalContext from "@state/global-context";
import productsData from "@data/products.json";
import AddToWishlistButton from "@components/shop/AddToWishlistButton";
import { useTheme } from "@mui/material/styles";
import AddToCartButton from "@components/shop/AddToCartButton";

const WishlistPage = () => {
  // Get global context for wishlist and loading state
  const { wishlist, isLoadingWishlist } = useContext(GlobalContext);

  // Filter products that are in the wishlist (array of IDs)
  const productsInWishlist = productsData.filter((product) =>
    wishlist.includes(product.id)
  );

  const theme = useTheme();
  // Detect if screen size is mobile to adjust display
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Show loader while wishlist data is loading
  if (isLoadingWishlist) {
    return (
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DefaultLayout>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Page title */}
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My Wishlist
        </Typography>

        {/* Message if wishlist is empty */}
        {productsInWishlist.length === 0 ? (
          <Typography variant="body1">Your wishlist is empty.</Typography>
        ) : (
          <TableContainer>
            <Table
              sx={{
                width: "100%",
                tableLayout: "auto", // Let column widths adapt to content
              }}
              aria-label="wishlist table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell> {/* Wishlist icon column */}
                  <TableCell>Product Name</TableCell>
                  {/* Hide price on mobile */}
                  {!isMobile && <TableCell>Unit Price</TableCell>}
                  <TableCell align="right">Action</TableCell> {/* Add to cart button */}
                </TableRow>
              </TableHead>
              <TableBody>
                {productsInWishlist.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {/* Button to add or remove from wishlist */}
                      <AddToWishlistButton productId={product.id} />
                    </TableCell>
                    <TableCell>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid>
                          {/* Product image */}
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
                    {/* Price visible only on non-mobile */}
                    {!isMobile && (
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                    )}
                    <TableCell align="right">
                      {/* Add to cart button */}
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
