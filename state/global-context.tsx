import { createContext, useEffect, useState, ReactNode } from "react";

/**
 * Product interface representing a product's properties.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

/**
 * CartItem interface representing a product in the cart along with its quantity.
 */
interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * GlobalState interface describing the shape of the global context state
 * including state variables and functions to manipulate cart and wishlist.
 */
interface GlobalState {
  open_cartsidebar: boolean; // Whether the cart sidebar is open
  cart: CartItem[]; // Current shopping cart items
  wishlist: number[]; // Array of product IDs in the wishlist
  isLoadingWishlist: boolean; // Loading state for wishlist initialization

  // Functions to update global state and perform actions:
  pushObject: (key: string, value: any, callback?: () => void) => void;
  addProductToCart: (product: Product, callback?: () => void) => void;
  removeProductToCart: (productId: number, callback?: () => void) => void;
  incrementProductQuantity: (productId: number) => void;
  decrementProductQuantity: (productId: number) => void;
  clearCart: () => void;
  addProductToWishlist: (productId: number, callback?: () => void) => void;
  removeProductFromWishlist: (productId: number, callback?: () => void) => void;
  handleAddToCart: (product: Product) => void;
}

// Create the React context with a placeholder default value
const GlobalContext = createContext<GlobalState | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

/**
 * GlobalProvider component
 *
 * Provides global state and functions related to cart and wishlist management.
 * State is persisted in sessionStorage to survive page reloads within the session.
 */
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // State: whether cart sidebar is open
  const [open_cartsidebar, setOpenCartSidebar] = useState(false);

  // State: current cart items
  const [cart, setCart] = useState<CartItem[]>([]);

  // State: wishlist product IDs
  const [wishlist, setWishlist] = useState<number[]>([]);

  // State: loading flag for wishlist initialization
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);

  // Load cart and wishlist from sessionStorage on component mount
  useEffect(() => {
    try {
      const sessionCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      if (Array.isArray(sessionCart)) {
        // Filter out invalid entries just in case
        const validCart = sessionCart.filter(
          (item) =>
            item &&
            item.product &&
            typeof item.quantity === "number" &&
            item.quantity > 0
        );
        setCart(validCart);
      }
    } catch {
      setCart([]);
    }

    try {
      const sessionWishlist = JSON.parse(
        sessionStorage.getItem("wishlist") || "[]"
      );
      if (Array.isArray(sessionWishlist)) setWishlist(sessionWishlist);
    } catch {
      setWishlist([]);
    }

    setIsLoadingWishlist(false);
  }, []);

  /**
   * General purpose setter for global state properties.
   * Currently supports 'open_cartsidebar' key.
   * Executes optional callback after setting state.
   */
  const pushObject = (key: string, value: any, callback?: () => void) => {
    if (key === "open_cartsidebar") setOpenCartSidebar(value);
    callback?.();
  };

  /**
   * Saves updated cart to state and sessionStorage.
   * @param cartToSave - New cart array
   */
  const saveCart = (cartToSave: CartItem[]) => {
    setCart(cartToSave);
    sessionStorage.setItem("cart", JSON.stringify(cartToSave));
  };

  /**
   * Adds a product to the cart or increments its quantity if already present.
   * @param product - Product to add
   * @param callback - Optional callback to run after state update
   */
  const addProductToCart = (product: Product, callback?: () => void) => {
    setCart((currentCart) => {
      const index = currentCart.findIndex(
        (item) => item.product.id === product.id
      );
      let newCart;
      if (index !== -1) {
        // Product exists, increment quantity
        newCart = [...currentCart];
        newCart[index] = {
          product,
          quantity: newCart[index].quantity + 1,
        };
      } else {
        // New product, add with quantity 1
        newCart = [...currentCart, { product, quantity: 1 }];
      }
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      callback?.();
      return newCart;
    });
  };

  /**
   * Removes a product completely from the cart by product ID.
   * @param productId - ID of product to remove
   * @param callback - Optional callback after update
   */
  const removeProductToCart = (productId: number, callback?: () => void) => {
    setCart((currentCart) => {
      const newCart = currentCart.filter(
        (item) => item.product.id !== productId
      );
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      callback?.();
      return newCart;
    });
  };

  /**
   * Increments the quantity of a product in the cart by product ID.
   * @param productId - ID of product
   */
  const incrementProductQuantity = (productId: number) => {
    setCart((currentCart) => {
      const index = currentCart.findIndex(
        (item) => item.product.id === productId
      );
      if (index === -1) return currentCart;

      const newCart = [...currentCart];
      newCart[index] = {
        product: newCart[index].product,
        quantity: newCart[index].quantity + 1,
      };
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  /**
   * Decrements the quantity of a product in the cart.
   * Removes the product if quantity reaches zero.
   * @param productId - ID of product
   */
  const decrementProductQuantity = (productId: number) => {
    setCart((currentCart) => {
      const index = currentCart.findIndex(
        (item) => item.product.id === productId
      );
      if (index === -1) return currentCart;

      const currentItem = currentCart[index];
      let newCart: CartItem[];

      if (currentItem.quantity <= 1) {
        // Remove product if quantity is 1 or less
        newCart = currentCart.filter((_, i) => i !== index);
      } else {
        newCart = [...currentCart];
        newCart[index] = {
          product: currentItem.product,
          quantity: currentItem.quantity - 1,
        };
      }

      sessionStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  /**
   * Clears the entire cart.
   */
  const clearCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  };

  /**
   * Adds a product ID to the wishlist if not already present.
   * @param productId - ID to add
   * @param callback - Optional callback after update
   */
  const addProductToWishlist = (productId: number, callback?: () => void) => {
    if (wishlist.includes(productId)) return;
    const updatedWishlist = [...wishlist, productId];
    setWishlist(updatedWishlist);
    sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    callback?.();
  };

  /**
   * Removes a product ID from the wishlist.
   * @param productId - ID to remove
   * @param callback - Optional callback after update
   */
  const removeProductFromWishlist = (
    productId: number,
    callback?: () => void
  ) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    callback?.();
  };

  /**
   * Helper function to add a product to cart.
   * @param product - Product to add
   */
  const handleAddToCart = (product: Product) => {
    addProductToCart(product);
  };

  return (
    <GlobalContext.Provider
      value={{
        open_cartsidebar,
        cart,
        wishlist,
        isLoadingWishlist,
        pushObject,
        addProductToCart,
        removeProductToCart,
        incrementProductQuantity,
        decrementProductQuantity,
        clearCart,
        addProductToWishlist,
        removeProductFromWishlist,
        handleAddToCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
