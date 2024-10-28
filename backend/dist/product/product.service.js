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
    async findAll(filters, page = 1, limit = 10, sort, limitCompleted = false, discount = false) {
        const query = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');
        if (filters) {
            if (filters.category?.id) {
                console.log(`Filtrando por categoria ID: ${filters.category.id}`);
                query.andWhere('category.id = :categoryId', {
                    categoryId: filters.category.id,
                });
            }
            if (filters.is_new !== undefined) {
                console.log(`Filtrando por produtos novos: ${filters.is_new}`);
                query.andWhere('product.is_new = :isNew', { isNew: filters.is_new });
            }
            if (discount) {
                console.log('Filtrando por produtos em desconto');
                query.andWhere('(product.discount_percent IS NOT NULL OR product.discount_price IS NOT NULL)');
            }
            if (filters.price !== undefined) {
                console.log(`Filtrando por preço até: ${filters.price}`);
                query.andWhere('product.price <= :price', { price: filters.price });
            }
        }
        if (sort) {
            console.log(`Ordenando por preço: ${sort}`);
            query.orderBy('product.price', sort);
        }
        const skip = (page - 1) * limit;
        query.skip(skip).take(limit);
        let [products, totalItems] = await query.getManyAndCount();
        let totalPages = Math.ceil(totalItems / limit);
        console.log(`Pagina: ${page} de um total de ${totalPages}`);
        if (products.length < limit && limitCompleted) {
            const additionalQuery = this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.category', 'category')
                .where('product.id NOT IN (:...filteredIds)', {
                filteredIds: products.map((p) => p.id),
            })
                .skip(0)
                .take(limit - products.length);
            if (sort) {
                additionalQuery.orderBy('product.price', sort);
            }
            const additionalProducts = await additionalQuery.getMany();
            products = [...products, ...additionalProducts];
            totalItems = products.length;
            totalPages = Math.ceil(totalItems / limit);
        }
        if (totalPages < page) {
            totalPages = page;
        }
        console.log(`Produtos obtidos: ${products.length} de um total de ${totalItems}`);
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
                ...productData,
                category: { id: productData.category_id },
                created_date: new Date(),
                updated_date: new Date(),
            });
            const savedProduct = await this.productRepository.save(newProduct);
            if (image) {
                try {
                    const result = await cloudinary_1.v2.uploader.upload(image.path, {
                        folder: 'products',
                        public_id: `product_${savedProduct.id}`,
                    });
                    savedProduct.cover_image_url = result.secure_url;
                    await this.productRepository.save(savedProduct);
                }
                catch (error) {
                    console.error('Erro ao salvar a imagem no Cloudinary:', error.message);
                    throw new Error('Erro ao salvar a imagem no Cloudinary: ' + error.message);
                }
            }
            else if (productData.cover_image_url) {
                savedProduct.cover_image_url = productData.cover_image_url;
                await this.productRepository.save(savedProduct);
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
        if (!product) {
            throw new common_1.NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
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
        if (product.cover_image_url) {
            try {
                const publicId = product.cover_image_url
                    .split('/')
                    .pop()
                    ?.split('.')[0];
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
            await this.remove(product.id);
        }
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