import { Category } from './category.model';
import { Review } from './review.model';
export declare class Product {
    id: number;
    name: string;
    sku: string;
    category: Category;
    description: string;
    large_description?: string;
    price: number;
    discount_price?: number;
    discount_percent?: number;
    is_new: boolean;
    sizes?: string[];
    colors?: {
        name: string;
        image_url: string;
    }[];
    tags?: string[];
    additional_information?: string;
    reviews: Review[];
    cover_image_url: string;
    gallery_images?: string[];
    created_date: Date;
    updated_date: Date;
}
