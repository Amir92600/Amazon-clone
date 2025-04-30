export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  ratingCount: number;
  category: string;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}