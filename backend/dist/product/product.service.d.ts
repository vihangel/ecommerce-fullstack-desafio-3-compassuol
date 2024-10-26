import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
export declare class ProductService {
    private productRepository;
    private categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    findAll(filters?: Partial<Product>, page?: number, limit?: number, sort?: 'ASC' | 'DESC', limitCompleted?: boolean): Promise<{
        products: Product[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
    findOne(id: number): Promise<Product>;
    create(productData: CreateProductDto, image?: Express.Multer.File): Promise<Product>;
    importProducts(products: CreateProductDto[]): Promise<void>;
    update(id: number, updateData: Partial<CreateProductDto>): Promise<Product>;
    remove(id: number): Promise<void>;
    removeAll(): Promise<void>;
}
