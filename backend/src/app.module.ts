import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { CategoryModule } from './category/category.module';
import { Category } from './models/category.model';
import { NewsletterLog } from './models/newsletter.model';
import { Product } from './models/product.model';
import { Review } from './models/review.model';
import { User } from './models/user.model';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Product, Category, User, NewsletterLog, Review],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    ProductModule,
    NewsletterModule,
    CategoryModule,
  ],
})
export class AppModule {}
