import { Product } from './product.model';
export declare class Review {
    id: number;
    author_name: string;
    content: string;
    rating: number;
    created_at: Date;
    product: Product;
}
