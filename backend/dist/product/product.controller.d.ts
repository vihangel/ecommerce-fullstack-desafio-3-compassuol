import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(categoryId?: string, isNew?: string, price?: string, page?: string, limit?: string, sort?: 'ASC' | 'DESC'): Promise<{
        products: Product[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
    findOne(id: number): Promise<Product>;
    create(productData: string, image?: Express.Multer.File): Promise<Product>;
    importProducts(products: CreateProductDto[]): Promise<void>;
    update(id: number, updateData: Partial<CreateProductDto>): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    removeAll(): Promise<{
        message: string;
    }>;
}
