"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const user_model_1 = require("../../models/user.model");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(username, password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        return (0, class_transformer_1.plainToInstance)(user_model_1.User, savedUser);
    }
    async findOne(username) {
        return this.userRepository.findOne({
            where: { username },
        });
    }
    async findById(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return (0, class_transformer_1.plainToInstance)(user_model_1.User, user);
    }
    async updateRefreshToken(userId, refreshToken) {
        await this.userRepository.update(userId, { refreshToken });
    }
    async updateUser(userId, updateData) {
        if (updateData.password) {
            delete updateData.password;
        }
        const user = await this.findById(userId);
        Object.assign(user, updateData);
        const updatedUser = await this.userRepository.save(user);
        return (0, class_transformer_1.plainToInstance)(user_model_1.User, updatedUser);
    }
    async removeUser(userId) {
        const user = await this.findById(userId);
        await this.userRepository.remove(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map