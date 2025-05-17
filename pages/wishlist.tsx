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

/**
 * WishlistPage component
 *
 * Displays the user's wishlist page containing the list of products
 * added to the wishlist. This page uses the global context to retrieve
 * the IDs of the products in the wishlist and only displays those products.
 *
 * Features:
 * - Uses global context to get wishlist IDs and loading state
 * - Filters products to display based on JSON product data
 * - Responsive behavior: hides price column on mobile screens
 * - Shows a loading spinner while wishlist data is being fetched
 *
 * Built with MUI components for layout, table, and UI elements,
 * and wrapped inside a DefaultLayout component for consistent page structure.
 */
const WishlistPage = () => {
  // Retrieve global context values: wishlist and loading status
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("WishlistPage must be used within a GlobalProvider");
  const { wishlist, isLoadingWishlist } = context;

  // Filter products whose IDs are included in the wishlist array
  const productsInWishlist = Array.isArray(wishlist)
    ? productsData.filter((p) => wishlist.includes(p.id))
    : [];

  // Access the MUI theme for responsive design
  const theme = useTheme();

  // Detect if current screen size is small (mobile) to conditionally hide some columns
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Show a circular progress indicator while loading wishlist data
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
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Ma Wishlist
        </Typography>

        {productsInWishlist.length === 0 ? (
          <Typography variant="body1">Votre wishlist est vide.</Typography>
        ) : (
          <TableContainer>
            <Table
              sx={{ width: "100%", tableLayout: "auto" }}
              aria-label="wishlist table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Nom du produit</TableCell>
                  {!isMobile && <TableCell>Prix</TableCell>}
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsInWishlist.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <AddToWishlistButton productId={product.id} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.title}
                          sx={{ width: 50, height: 50, borderRadius: 1 }}
                        />
                        <Typography variant="body2">{product.title}</Typography>
                      </Box>
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
