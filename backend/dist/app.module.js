"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./auth/user/user.module");
const category_module_1 = require("./category/category.module");
const category_model_1 = require("./models/category.model");
const newsletter_model_1 = require("./models/newsletter.model");
const product_model_1 = require("./models/product.model");
const user_model_1 = require("./models/user.model");
const newsletter_module_1 = require("./newsletter/newsletter.module");
const product_module_1 = require("./product/product.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT, 10),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: [product_model_1.Product, category_model_1.Category, user_model_1.User, newsletter_model_1.NewsletterLog],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            newsletter_module_1.NewsletterModule,
            category_module_1.CategoryModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map