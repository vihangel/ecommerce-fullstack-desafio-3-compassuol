import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<any>;
    refreshToken(refreshToken: string): Promise<any>;
}
