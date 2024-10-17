import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterLog } from '../models/newsletter.model';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterLog])],
  providers: [NewsletterService],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
