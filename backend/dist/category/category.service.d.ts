import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
export declare class CategoryService {
    private categoryRepository;
    private productRepository;
    constructor(categoryRepository: Repository<Category>, productRepository: Repository<Product>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(categoryData: CreateCategoryDto, image?: Express.Multer.File): Promise<Category>;
    update(id: number, updateData: Partial<CreateCategoryDto>, image?: Express.Multer.File): Promise<Category>;
    remove(id: number): Promise<void>;
    removeAll(): Promise<void>;
}
