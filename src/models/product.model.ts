import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sku: string;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ length: 250 })
  description: string;

  @Column({ length: 500 })
  large_description: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount_price: number;

  @Column('int', { nullable: true })
  discount_percent: number;

  @Column('boolean')
  is_new: boolean;

  @Column({ length: 250 })
  image_link: string;

  @Column({ length: 1000 })
  other_images_link: string;

  @Column('timestamp')
  created_date: Date;

  @Column('timestamp')
  updated_date: Date;
}
