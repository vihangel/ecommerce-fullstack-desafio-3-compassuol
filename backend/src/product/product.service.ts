// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Método para listar todos os produtos
  async findAll(
    filters?: Partial<Product>,
    page: number = 1,
    limit: number = 10,
    sort?: 'ASC' | 'DESC',
    limitCompleted = false,
  ): Promise<{
    products: Product[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    // Inicializando a consulta
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    // Aplicando filtros na ordem desejada
    if (filters) {
      // 1. Filtro de Categoria (se houver)
      if (filters.category?.id) {
        console.log(`Filtrando por categoria ID: ${filters.category.id}`);
        query.andWhere('category.id = :categoryId', {
          categoryId: filters.category.id,
        });
      }

      // 2. Filtro de Produto Novo (is_new)
      if (filters.is_new !== undefined) {
        console.log(`Filtrando por produtos novos: ${filters.is_new}`);
        query.andWhere('product.is_new = :isNew', { isNew: filters.is_new });
      }

      // 3. Filtro de Preço (se houver)
      if (filters.price !== undefined) {
        console.log(`Filtrando por preço até: ${filters.price}`);
        query.andWhere('product.price <= :price', { price: filters.price });
      }
    }

    // Aplicando ordenação, se houver
    if (sort) {
      console.log(`Ordenando por preço: ${sort}`);
      query.orderBy('product.price', sort);
    }

    // Aplicando paginação
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    // Obtendo os produtos filtrados e o total de itens filtrados
    let [products, totalItems] = await query.getManyAndCount();
    let totalPages = Math.ceil(totalItems / limit);

    // Caso o número de produtos filtrados seja menor que o limite,
    // buscar mais produtos sem aplicar os filtros para preencher o restante
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

      // Adicionando ordenação, se houver
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
    console.log(
      `Produtos obtidos: ${products.length} de um total de ${totalItems}`,
    );
    return { products, totalItems, totalPages, currentPage: page };
  }

  // Método para buscar um produto pelo ID
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  // Método para criar um produto
  async create(
    productData: CreateProductDto,
    image?: Express.Multer.File,
  ): Promise<Product> {
    console.log('Dados recebidos:', productData);
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: productData.category_id },
      });

      if (!category) {
        throw new NotFoundException(
          `Categoria com ID ${productData.category_id} não encontrada`,
        );
      }

      const newProduct = this.productRepository.create({
        ...productData,
        category: { id: productData.category_id } as any,
        created_date: new Date(),
        updated_date: new Date(),
      });

      const savedProduct = await this.productRepository.save(newProduct);

      // Se a imagem for enviada como arquivo, faça upload no Cloudinary
      if (image) {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            folder: 'products',
            public_id: `product_${savedProduct.id}`,
          });
          savedProduct.cover_image_url = result.secure_url;
          await this.productRepository.save(savedProduct);
        } catch (error) {
          console.error(
            'Erro ao salvar a imagem no Cloudinary:',
            error.message,
          );
          throw new Error(
            'Erro ao salvar a imagem no Cloudinary: ' + error.message,
          );
        }
      } else if (productData.cover_image_url) {
        // Se uma URL for fornecida diretamente no productData, use-a como a imagem de capa
        savedProduct.cover_image_url = productData.cover_image_url;
        await this.productRepository.save(savedProduct);
      }

      return savedProduct;
    } catch (error) {
      console.error('Erro ao criar produto:', error.message);
      throw new Error('Erro ao criar produto: ' + error.message);
    }
  }

  async importProducts(products: CreateProductDto[]): Promise<void> {
    for (const productData of products) {
      try {
        await this.create(productData);
      } catch (error) {
        console.error(
          `Erro ao importar produto: ${productData.name}`,
          error.message,
        );
      }
    }
  }

  // Método para atualizar um produto existente
  async update(
    id: number,
    updateData: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    // Atualizando o produto com os novos dados
    const updatedProduct = Object.assign(product, updateData, {
      updated_date: new Date(),
    });

    // Se houver imagem base64 no update, atualiza o arquivo de imagem
    if (updateData.image_data) {
      const imageBuffer = Buffer.from(updateData.image_data, 'base64');
      const imagePath = join(__dirname, '..', '..', 'uploads', `${id}.png`);
      await fs.writeFile(imagePath, imageBuffer);
    }

    return this.productRepository.save(updatedProduct);
  }
  // Método para remover um produto pelo ID

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    // Remove a imagem associada do Cloudinary se existir
    if (product.cover_image_url) {
      try {
        // Extrair o public_id a partir da URL da imagem armazenada no Cloudinary
        const publicId = product.cover_image_url
          .split('/')
          .pop()
          ?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`products/${publicId}`);
        }
      } catch (error) {
        throw new Error(
          'Erro ao remover a imagem do Cloudinary: ' + error.message,
        );
      }
    }

    // Remove o produto do banco de dados
    await this.productRepository.remove(product);
  }

  // Método para remover todos os produtos
  async removeAll(): Promise<void> {
    // Buscar todos os produtos
    const products = await this.productRepository.find();

    for (const product of products) {
      await this.remove(product.id);
    }
  }
}
