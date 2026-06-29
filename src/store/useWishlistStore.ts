import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../lib/types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        if (!currentItems.some((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },
      removeItem: (productId) => {
        const currentItems = get().items;
        set({ items: currentItems.filter((item) => item.id !== productId) });
      },
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.id === product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'krishna-jewellers-wishlist',
    }
  )
);
