import { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GlobalContext from '@state/global-context';

interface Props {
  productId: number;
}

const AddToWishlistButton: React.FC<Props> = ({ productId }) => {
  const {
    wishlist,
    addProductToWishlist,
    removeProductFromWishlist,
  } = useContext(GlobalContext);

  const isInWishlist = wishlist.includes(productId);

  const handleClick = () => {
    if (isInWishlist) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  };

  return (
    <Tooltip title={isInWishlist ? 'Retirer de la wishlist' : 'Ajouter à la wishlist'}>
      <IconButton
        onClick={handleClick}
        color={isInWishlist ? 'error' : 'default'}
        aria-label="toggle wishlist"
      >
        {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default AddToWishlistButton;
