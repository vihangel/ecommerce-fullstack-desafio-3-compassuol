import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("../models/product.model").Product[]>;
    findOne(id: number): Promise<import("../models/product.model").Product>;
    findWithFilters(name?: string, category?: string, minPrice?: number, maxPrice?: number): Promise<import("../models/product.model").Product[]>;
    create(productData: CreateProductDto): Promise<any>;
    update(id: number, updateData: Partial<CreateProductDto>): Promise<any>;
    remove(id: number): Promise<any>;
}
