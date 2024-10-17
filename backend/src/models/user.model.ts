import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude() // Isso vai excluir a senha na transformação da entidade para JSON
  @Column()
  password: string;

  @Exclude() // Exclui o refresh token do retorno, se for necessário
  @Column({ nullable: true })
  refreshToken: string;
}
