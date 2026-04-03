import { create } from 'zustand';
import type { Locale } from '../i18n/translations';

export type UserRole = 'CMC_ADMIN' | 'RIVENDITORE' | 'UTENTE_FINALE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dealerId?: string;
  dealerName?: string;
  locale: Locale;
}

export interface CartItem {
  partCode: string;
  description: string;
  price: number;
  quantity: number;
}

interface AppState {
  user: User | null;
  locale: Locale;
  cart: CartItem[];
  sidebarOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLocale: (locale: Locale) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (partCode: string) => void;
  updateCartQuantity: (partCode: string, quantity: number) => void;
  clearCart: () => void;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  locale: 'it',
  cart: [],
  sidebarOpen: true,

  login: (user) => set({ user, locale: user.locale }),
  logout: () => set({ user: null, cart: [] }),
  setLocale: (locale) => set({ locale }),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.partCode === item.partCode);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.partCode === item.partCode ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (partCode) =>
    set((state) => ({ cart: state.cart.filter((c) => c.partCode !== partCode) })),

  updateCartQuantity: (partCode, quantity) =>
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((c) => c.partCode !== partCode)
        : state.cart.map((c) => (c.partCode === partCode ? { ...c, quantity } : c)),
    })),

  clearCart: () => set({ cart: [] }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
