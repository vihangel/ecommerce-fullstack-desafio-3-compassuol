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

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ length: 500, default: 'No description available' })
  description: string;

  @Column({ type: 'text', nullable: true })
  large_description?: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount_price?: number; // Adicionando a propriedade `discount_price`

  @Column('int', { nullable: true })
  discount_percent?: number;

  @Column('boolean', { default: true })
  is_new: boolean;

  @Column('bytea', { nullable: true }) // Campo para armazenar a imagem em binário (usando bytea no PostgreSQL)
  image_data?: Buffer;

  @Column({ nullable: true })
  image_url: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;
}
