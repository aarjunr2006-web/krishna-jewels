import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../lib/types';

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product, variant: string, quantity?: number) => void;
  removeItem: (productId: string, variant: string) => void;
  updateQty: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addItem: (product, variant, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.id === product.id && item.variant === variant
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, { product, variant, quantity }] });
        }
      },
      removeItem: (productId, variant) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter(
          (item) => !(item.product.id === productId && item.variant === variant)
        );
        set({ items: updatedItems });
      },
      updateQty: (productId, variant, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) =>
          item.product.id === productId && item.variant === variant
            ? { ...item, quantity }
            : item
        );
        set({ items: updatedItems });
      },
      clearCart: () => set({ items: [] }),
      getCartSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'krishna-jewellers-cart',
    }
  )
);
