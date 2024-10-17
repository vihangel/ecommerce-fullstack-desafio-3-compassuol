import { Repository } from 'typeorm';
import { User } from '../../models/user.model';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, password: string): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
    findById(userId: number): Promise<User>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    updateUser(userId: number, updateData: Partial<User>): Promise<User>;
    removeUser(userId: number): Promise<void>;
}
