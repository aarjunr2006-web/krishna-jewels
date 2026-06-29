export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  images: string[];
  categorySlug: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specs: Record<string, string>;
  details: string[];
  inStock: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isSale: boolean;
  occasions: string[];
  variants: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string; // inline SVG markup or placeholder color gradient name
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
