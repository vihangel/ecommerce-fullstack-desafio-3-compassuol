import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<import("../models/category.model").Category[]>;
    findOne(id: number): Promise<import("../models/category.model").Category>;
    create(categoryData: CreateCategoryDto): Promise<import("../models/category.model").Category>;
    update(id: number, updateData: Partial<CreateCategoryDto>): Promise<import("../models/category.model").Category>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
