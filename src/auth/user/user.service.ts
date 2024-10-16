import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Criação de um usuário com senha hashada
  async createUser(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(User, savedUser); // Transforma para excluir campos como senha do retorno
  }

  // Método para buscar um usuário pelo nome de usuário
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  // Método para buscar um usuário pelo ID
  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return plainToInstance(User, user); // Transforma para excluir campos como senha do retorno
  }

  // Atualização do refresh token do usuário
  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  // Método para atualizar um usuário (sem atualizar a senha)
  async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      delete updateData.password; // Evita atualização direta da senha
    }
    const user = await this.findById(userId);
    Object.assign(user, updateData);
    const updatedUser = await this.userRepository.save(user);
    return plainToInstance(User, updatedUser); // Transforma para excluir campos como senha do retorno
  }

  // Método para remover um usuário
  async removeUser(userId: number): Promise<void> {
    const user = await this.findById(userId);
    await this.userRepository.remove(user);
  }
}
