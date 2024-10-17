import { User } from '../../models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(userData: {
        username: string;
        password: string;
    }): Promise<User>;
    findOne(id: number): Promise<User>;
    updateUser(id: number, updateData: Partial<User>): Promise<User>;
    removeUser(id: number): Promise<any>;
}
