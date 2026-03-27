import { create } from 'zustand';
import type { CartItem, Product, User, Order } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  addOrder: (order: Order) => void;
  setCurrentOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { id: `${product.id}-${Date.now()}`, product, quantity }],
      };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  getItemCount: () => {
    const state = get();
    return state.items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  getOrderById: (orderId) => {
    const state = JSON.parse(JSON.stringify({ orders: [] }));
    return state.orders.find((order: Order) => order.id === orderId);
  },
}));
