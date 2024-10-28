// src/models/category.model.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.model';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: ['remove'],
  })
  products: Product[];
}
