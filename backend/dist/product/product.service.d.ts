import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../models/product.model';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    findWithFilters(filters: {
        name?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
    }): Promise<Product[]>;
    create(productData: CreateProductDto): Promise<Product>;
    update(id: number, updateData: Partial<CreateProductDto>): Promise<Product>;
    remove(id: number): Promise<void>;
}
