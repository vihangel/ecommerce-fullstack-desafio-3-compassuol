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
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll(filters, page = 1, limit = 10) {
        const query = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');
        if (filters) {
            if (filters.category?.id) {
                query.andWhere('product.category.id = :categoryId', {
                    categoryId: filters.category.id,
                });
            }
            if (filters.is_new !== undefined) {
                query.andWhere('product.is_new = :isNew', { isNew: filters.is_new });
            }
            if (filters.price) {
                query.andWhere('product.price <= :price', { price: filters.price });
            }
        }
        const skip = (page - 1) * limit;
        query.skip(skip).take(limit);
        const [products, totalItems] = await query.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
        return { products, totalItems, totalPages, currentPage: page };
    }
    async findOne(id) {
        return this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
    }
    async create(productData, image) {
        console.log('Dados recebidos:', productData);
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: productData.category_id },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Categoria com ID ${productData.category_id} não encontrada`);
            }
            const newProduct = this.productRepository.create({
                name: productData.name,
                sku: productData.sku,
                description: productData.description,
                large_description: productData.large_description,
                price: productData.price,
                discount_price: productData.discount_price,
                discount_percent: productData.discount_percent,
                is_new: productData.is_new,
                created_date: new Date(),
                updated_date: new Date(),
                category: { id: productData.category_id },
            });
            const savedProduct = await this.productRepository.save(newProduct);
            if (image) {
                try {
                    const result = await cloudinary_1.v2.uploader.upload(image.path, {
                        folder: 'products',
                        public_id: `product_${savedProduct.id}`,
                    });
                    savedProduct.image_url = result.secure_url;
                    await this.productRepository.save(savedProduct);
                }
                catch (error) {
                    console.error('Erro ao salvar a imagem no Cloudinary:', error.message);
                    throw new Error('Erro ao salvar a imagem no Cloudinary: ' + error.message);
                }
            }
            return savedProduct;
        }
        catch (error) {
            console.error('Erro ao criar produto:', error.message);
            throw new Error('Erro ao criar produto: ' + error.message);
        }
    }
    async importProducts(products) {
        for (const productData of products) {
            try {
                await this.create(productData);
            }
            catch (error) {
                console.error(`Erro ao importar produto: ${productData.name}`, error.message);
            }
        }
    }
    async update(id, updateData) {
        const product = await this.findOne(id);
        const updatedProduct = Object.assign(product, updateData, {
            updated_date: new Date(),
        });
        if (updateData.image_data) {
            const imageBuffer = Buffer.from(updateData.image_data, 'base64');
            const imagePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', `${id}.png`);
            await fs_1.promises.writeFile(imagePath, imageBuffer);
        }
        return this.productRepository.save(updatedProduct);
    }
    async remove(id) {
        const product = await this.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        if (product.image_url) {
            try {
                const publicId = product.image_url.split('/').pop()?.split('.')[0];
                if (publicId) {
                    await cloudinary_1.v2.uploader.destroy(`products/${publicId}`);
                }
            }
            catch (error) {
                throw new Error('Erro ao remover a imagem do Cloudinary: ' + error.message);
            }
        }
        await this.productRepository.remove(product);
    }
    async removeAll() {
        const products = await this.productRepository.find();
        for (const product of products) {
            if (product.image_url) {
                try {
                    const publicId = product.image_url.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary_1.v2.uploader.destroy(`products/${publicId}`);
                    }
                }
                catch (error) {
                    console.error('Erro ao remover a imagem do Cloudinary:', error.message);
                }
            }
        }
        await this.productRepository.clear();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_model_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_model_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map