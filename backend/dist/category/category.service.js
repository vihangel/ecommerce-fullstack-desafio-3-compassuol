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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const stream_1 = require("stream");
const typeorm_2 = require("typeorm");
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
let CategoryService = class CategoryService {
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async findAll() {
        return this.categoryRepository.find();
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async create(categoryData, image) {
        const existingCategory = await this.categoryRepository.findOne({
            where: { name: categoryData.name },
        });
        if (existingCategory) {
            throw new common_1.ConflictException(`Category with name "${categoryData.name}" already exists`);
        }
        let imageUrl;
        if (image) {
            console.log('Tentando fazer upload da imagem usando buffer');
            try {
                imageUrl = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                        folder: 'categories',
                    }, (error, result) => {
                        if (error) {
                            console.error('Erro ao salvar a imagem no Cloudinary:', error.message);
                            return reject(new Error('Erro ao salvar a imagem no Cloudinary: ' + error.message));
                        }
                        if (result) {
                            console.log('Upload bem-sucedido, URL da imagem:', result.secure_url);
                            resolve(result.secure_url);
                        }
                    });
                    const stream = new stream_1.Stream.PassThrough();
                    stream.end(image.buffer);
                    stream.pipe(uploadStream);
                });
            }
            catch (error) {
                throw new Error('Erro ao salvar a imagem no Cloudinary: ' + error.message);
            }
        }
        const newCategory = this.categoryRepository.create({
            ...categoryData,
            image_url: imageUrl || categoryData.image_url || null,
        });
        return this.categoryRepository.save(newCategory);
    }
    async update(id, updateData, image) {
        const category = await this.findOne(id);
        if (image) {
            try {
                console.log('Caminho da imagem:', image.path);
                const result = await cloudinary_1.v2.uploader.upload(image.path, {
                    folder: 'categories',
                    public_id: `category_${category.id}`,
                });
                updateData.image_url = result.secure_url;
                await fs_1.promises.unlink(image.path);
            }
            catch (error) {
                console.error('Erro ao salvar a imagem no Cloudinary:', error.message);
                throw new Error('Erro ao salvar a imagem no Cloudinary: ' + error.message);
            }
        }
        const updatedCategory = Object.assign(category, updateData);
        return this.categoryRepository.save(updatedCategory);
    }
    async remove(id) {
        const category = await this.findOne(id);
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found.`);
        }
        if (category.image_url) {
            try {
                const publicId = category.image_url.split('/').pop()?.split('.')[0];
                if (publicId) {
                    await cloudinary_1.v2.uploader.destroy(`categories/${publicId}`);
                }
            }
            catch (error) {
                throw new Error('Erro ao remover a imagem do Cloudinary: ' + error.message);
            }
        }
        await this.productRepository.delete({ category: { id } });
        await this.categoryRepository.remove(category);
    }
    async removeAll() {
        await this.productRepository.delete({});
        await this.categoryRepository.delete({});
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_model_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(product_model_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map