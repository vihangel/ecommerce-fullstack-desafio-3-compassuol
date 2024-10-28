import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<any>;
    refresh(body: {
        refreshToken: string;
    }): Promise<any>;
}
