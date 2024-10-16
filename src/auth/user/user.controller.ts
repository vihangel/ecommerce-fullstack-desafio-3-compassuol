import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../../models/user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(body.username, body.password);
  }
}
