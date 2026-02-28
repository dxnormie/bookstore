import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Book } from './book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'password123',
      database: process.env.DB_NAME || 'bookstore',
      entities: [Book],
      synchronize: true, // auto-creates tables
    }),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
