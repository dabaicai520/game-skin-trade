export interface Skin {
  id: string;
  name: string;
  game: 'CSGO' | 'Dota2' | 'PUBG' | 'Apex';
  quality: 'Consumer Grade' | 'Industrial Grade' | 'Mil-Spec' | 'Restricted' | 'Classified' | 'Covert' | 'Contraband' | 'Common' | 'Uncommon' | 'Rare' | 'Mythical' | 'Legendary' | 'Ancient' | 'Immortal';
  wear: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
  float: number;
  price: number;
  image: string;
  description: string;
  seller: Seller;
  sales: number;
  createdAt: string;
  priceHistory: PricePoint[];
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  salesCount: number;
  verified: boolean;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface FilterState {
  game: string;
  quality: string;
  wear: string;
  priceMin: number;
  priceMax: number;
  search: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'sales-desc' | 'newest';
