import { createContext, useEffect, useState, ReactNode } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface GlobalState {
  open_cartsidebar: boolean;
  cart: Product[];
  wishlist: number[];
  pushObject: (key: string, value: any, callback?: () => void) => void;
  addProductToCart: (product: Product, callback?: () => void) => void;
  removeProductToCart: (id: number, callback?: () => void) => void;
  addProductToWishlist: (productId: number, callback?: () => void) => void;
  removeProductFromWishlist: (productId: number, callback?: () => void) => void;
  handleAddToCart: (product: Product) => void;
}

const GlobalContext = createContext<GlobalState>({} as GlobalState);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [open_cartsidebar, setOpenCartSidebar] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const sessionCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(sessionCart);

    const sessionWishlist = JSON.parse(
      sessionStorage.getItem("wishlist") || "[]"
    );
    setWishlist(sessionWishlist);
  }, []);

  const pushObject = (key: string, value: any, callback?: () => void) => {
    if (key === "open_cartsidebar") setOpenCartSidebar(value);
    callback?.();
  };

  const addProductToCart = (product: Product, callback?: () => void) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    callback?.();
  };

  const handleAddToCart = (product: Product) => {
    addProductToCart(product);
    // pushObject("open_cartsidebar", true);
  };

  const removeProductToCart = (id: number, callback?: () => void) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    callback?.();
  };

  const addProductToWishlist = (productId: number, callback?: () => void) => {
    if (wishlist.includes(productId)) return;
    const updatedWishlist = [...wishlist, productId];
    setWishlist(updatedWishlist);
    sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    callback?.();
  };

  const removeProductFromWishlist = (
    productId: number,
    callback?: () => void
  ) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    callback?.();
  };

  return (
    <GlobalContext.Provider
      value={{
        open_cartsidebar,
        cart,
        wishlist,
        pushObject,
        addProductToCart,
        removeProductToCart,
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
