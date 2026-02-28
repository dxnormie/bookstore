import { Controller, Get, Post, Body } from '@nestjs/common';

interface Order {
  id: number;
  userId: string;
  books: { id: number; title: string; price: number }[];
  total: number;
  status: string;
  createdAt: Date;
}

const orders: Order[] = [];

class CreateOrderDto {
  userId: string;
  books: { id: number; title: string; price: number }[];
  total: number;
}

@Controller()
export class OrdersController {
  @Get('/health')
  health() {
    return { status: 'orders-service ok' };
  }

  @Get('/orders')
  getOrders() {
    return orders;
  }

  @Post('/orders')
  createOrder(@Body() body: CreateOrderDto) {
    const order = {
      id: orders.length + 1,
      ...body,
      status: 'confirmed',
      createdAt: new Date(),
    };
    orders.push(order);
    return order;
  }
}
