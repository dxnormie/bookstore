import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Controller()
export class InventoryController {
    constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  @Get('/health')
  health() {
    return { status: 'inventory-service ok' };
  }

  @Get('/books')
  async getBooks() {
    const books = await this.bookRepo.find();
    if (books.length === 0) {
      // Seed data on first call
      await this.bookRepo.save([
        { title: 'Dune', author: 'Frank Herbert', price: 12.99, genre: 'Sci-Fi' },
        { title: '1984', author: 'George Orwell', price: 9.99, genre: 'Dystopia' },
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 11.99, genre: 'Fantasy' },
        { title: 'Clean Code', author: 'Robert C. Martin', price: 34.99, genre: 'Tech' },
      ]);
      return this.bookRepo.find();
    }
    return books;
  }

  @Get('/books/:id')
  async getBook(@Param('id') id: string) {
    return this.bookRepo.findOneBy({ id: parseInt(id) }) || { error: 'Not found' };
  }
}
