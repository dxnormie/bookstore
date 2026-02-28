import { Controller, Get, Param } from '@nestjs/common';

const books = [
  { id: 1, title: 'Dune', author: 'Frank Herbert', price: 12.99, genre: 'Sci-Fi' },
  { id: 2, title: '1984', author: 'George Orwell', price: 9.99, genre: 'Dystopia' },
  { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 11.99, genre: 'Fantasy' },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', price: 34.99, genre: 'Tech' },
];

@Controller()
export class InventoryController {
  @Get('/health')
  health() {
    return { status: 'inventory-service ok' };
  }

  @Get('/books')
  getBooks() {
    return books;
  }

  @Get('/books/:id')
  getBook(@Param('id') id: string) {
    return books.find(b => b.id === parseInt(id)) || { error: 'Not found' };
  }
}
