export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  fitnessGoal?: string[];
  ingredients?: string[];
  nutritionFacts?: { label: string; value: string }[];
  usage?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
}
