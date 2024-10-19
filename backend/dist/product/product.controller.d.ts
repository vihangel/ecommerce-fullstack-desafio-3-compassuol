import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(filters: Partial<Product>, limit?: number): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(productData: string, image?: Express.Multer.File): Promise<Product>;
    update(id: number, updateData: Partial<CreateProductDto>): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    removeAll(): Promise<{
        message: string;
    }>;
}
