export declare class CreateProductDto {
    name: string;
    sku: string;
    category_id: number;
    description?: string;
    large_description?: string;
    price: number;
    discount_price?: number;
    discount_percent?: number;
    is_new?: boolean;
    sizes?: string[];
    colors?: {
        name: string;
        image_url: string;
    }[];
    tags?: string[];
    additional_information?: string;
    cover_image_url?: string;
    gallery_images?: string[];
    image_data?: string;
}
