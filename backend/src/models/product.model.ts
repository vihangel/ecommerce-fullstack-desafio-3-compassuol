import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.model';
import { Review } from './review.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sku: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ length: 500, default: 'No description available' })
  description: string;

  @Column({ type: 'text', nullable: true })
  large_description?: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount_price?: number;

  @Column('int', { nullable: true })
  discount_percent?: number;

  @Column('boolean', { default: true })
  is_new: boolean;

  @Column('text', { array: true, nullable: true })
  sizes?: string[];

  @Column('jsonb', { nullable: true })
  colors?: { name: string; image_url: string }[];

  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @Column({ type: 'text', nullable: true })
  additional_information?: string;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @Column({ nullable: true })
  cover_image_url: string; // Adicionando campo image_url

  @Column('text', { array: true, nullable: true })
  gallery_images?: string[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;
}
