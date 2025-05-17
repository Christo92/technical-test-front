import { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GlobalContext from "@state/global-context";

interface Props {
  productId: number;
}

/**
 * AddToWishlistButton component
 *
 * A toggle button that adds or removes a product from the user's wishlist.
 *
 * Props:
 * - productId: The unique identifier of the product to add/remove from the wishlist.
 *
 * Features:
 * - Uses Material UI IconButton with a tooltip indicating action.
 * - Shows a filled heart icon if the product is in the wishlist, otherwise an outlined heart.
 * - Changes color to error (red) when the product is in the wishlist.
 * - Utilizes global context to read and update the wishlist state.
 */
const AddToWishlistButton: React.FC<Props> = ({ productId }) => {
  const { wishlist, addProductToWishlist, removeProductFromWishlist } =
    useContext(GlobalContext);

  // Check if product is already in the wishlist
  const isInWishlist = wishlist.includes(productId);

  // Toggle wishlist status on click
  const handleClick = () => {
    if (isInWishlist) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  };

  return (
    <Tooltip
      title={isInWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
    >
      <IconButton
        onClick={handleClick}
        color={isInWishlist ? "error" : "default"}
        aria-label="toggle wishlist"
      >
        {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default AddToWishlistButton;
