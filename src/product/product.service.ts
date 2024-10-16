import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Método para listar todos os produtos
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  // Método para buscar um produto pelo ID
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findWithFilters(filters: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filters.name) {
      queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.category) {
      queryBuilder.innerJoinAndSelect(
        'product.category',
        'category',
        'category.name ILIKE :category',
        { category: `%${filters.category}%` },
      );
    } else {
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

  // Método para criar um novo produto
  async create(productData: CreateProductDto): Promise<Product> {
    // Aqui, criamos uma instância de Product a partir do DTO, mas sem as propriedades que são geradas automaticamente
    const newProduct = this.productRepository.create({
      ...productData,
      created_date: new Date(), // Adiciona a data de criação
      updated_date: new Date(), // Adiciona a data de atualização
    });
    return this.productRepository.save(newProduct);
  }

  // Método para atualizar um produto existente
  async update(
    id: number,
    updateData: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const updatedProduct = Object.assign(product, updateData, {
      updated_date: new Date(),
    });
    return this.productRepository.save(updatedProduct);
  }

  // Método para remover um produto pelo ID
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
