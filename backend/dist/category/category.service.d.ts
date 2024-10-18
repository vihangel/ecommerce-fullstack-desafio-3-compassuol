import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../models/category.model';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(categoryData: CreateCategoryDto): Promise<Category>;
    update(id: number, updateData: Partial<CreateCategoryDto>): Promise<Category>;
    remove(id: number): Promise<void>;
}
