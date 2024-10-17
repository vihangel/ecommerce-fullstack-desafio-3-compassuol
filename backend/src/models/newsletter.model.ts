import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NewsletterLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  to: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ type: 'text', default: 'Newsletter' })
  content: string;

  @Column('timestamp')
  sentAt: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  error: string;
}
