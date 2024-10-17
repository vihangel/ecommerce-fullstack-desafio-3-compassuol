"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_model_1 = require("../models/product.model");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAll() {
        return this.productRepository.find({ relations: ['category'] });
    }
    async findOne(id) {
        return this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
    }
    async findWithFilters(filters) {
        const queryBuilder = this.productRepository.createQueryBuilder('product');
        if (filters.name) {
            queryBuilder.andWhere('product.name ILIKE :name', {
                name: `%${filters.name}%`,
            });
        }
        if (filters.category) {
            queryBuilder.innerJoinAndSelect('product.category', 'category', 'category.name ILIKE :category', { category: `%${filters.category}%` });
        }
        else {
            queryBuilder.leftJoinAndSelect('product.category', 'category');
        }
        if (filters.minPrice) {
            queryBuilder.andWhere('product.price >= :minPrice', {
                minPrice: filters.minPrice,
            });
        }
        if (filters.maxPrice) {
            queryBuilder.andWhere('product.price <= :maxPrice', {
                maxPrice: filters.maxPrice,
            });
        }
        return queryBuilder.getMany();
    }
    async create(productData) {
        const newProduct = this.productRepository.create({
            ...productData,
            created_date: new Date(),
            updated_date: new Date(),
        });
        return this.productRepository.save(newProduct);
    }
    async update(id, updateData) {
        const product = await this.findOne(id);
        const updatedProduct = Object.assign(product, updateData, {
            updated_date: new Date(),
        });
        return this.productRepository.save(updatedProduct);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_model_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map