import { Category } from './category.model';
export declare class Product {
    id: number;
    name: string;
    sku: string;
    category: Category;
    description: string;
    price: number;
    discount_percent: number;
    is_new: boolean;
    image_data: Buffer;
    created_date: Date;
    updated_date: Date;
}
