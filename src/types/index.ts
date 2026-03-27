export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  tags: string[];
  discount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';
  createdAt: Date;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  deliveryAddress: Address;
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cod';
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface Promo {
  id: string;
  code: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
}
