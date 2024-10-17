import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const result = user; // Remove a senha do retorno
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1y' });

    // Salva o refresh token no banco de dados do usuário, sobrescrevendo qualquer token anterior
    await this.userService.updateRefreshToken(user.id, refreshToken);

    // Retorna os dados do usuário sem a senha e sem token
    const userWithoutSensitiveData = {
      ...user,
      password: undefined,
      refreshToken: undefined,
    };

    return {
      ...userWithoutSensitiveData,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      // Verifica se o refreshToken é válido
      const payload = this.jwtService.verify(refreshToken);

      // Busca o usuário correspondente no banco de dados
      const user = await this.userService.findOne(payload.username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Verifica se o refreshToken do banco é o mesmo que foi passado
      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Gera um novo accessToken
      const newAccessToken = this.jwtService.sign(
        { username: user.username, sub: user.id },
        { expiresIn: '15m' },
      );

      // Retorna o novo access token e mantém o refresh token
      const userWithoutSensitiveData = user;

      return {
        ...userWithoutSensitiveData,
        access_token: newAccessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token: ' + e.message);
    }
  }
}
