import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("../models/product.model").Product[]>;
    findOne(id: number): Promise<import("../models/product.model").Product>;
    create(productData: string, image?: Express.Multer.File): Promise<import("../models/product.model").Product>;
    update(id: number, updateData: Partial<CreateProductDto>): Promise<import("../models/product.model").Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    removeAll(): Promise<{
        message: string;
    }>;
}
