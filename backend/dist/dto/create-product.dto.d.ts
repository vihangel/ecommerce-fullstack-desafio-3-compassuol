export declare class CreateProductDto {
    name: string;
    sku: string;
    category_id: number;
    description: string;
    large_description?: string;
    price: number;
    discount_price?: number;
    discount_percent?: number;
    is_new: boolean;
    image_data?: Buffer;
}
