import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../models/user.model';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Rota protegida para criar um novo usuário
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Body() userData: { username: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(userData.username, userData.password);
  }

  // Rota protegida para buscar um usuário pelo ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  // Rota protegida para atualizar um usuário
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(id, updateData);
  }

  // Rota protegida para remover um usuário
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: number): Promise<any> {
    await this.userService.removeUser(id);
    return { message: `User with ID ${id} has been deleted` };
  }
}
