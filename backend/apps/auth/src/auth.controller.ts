import { Controller, Get, Post, Body } from '@nestjs/common';

class LoginDto {
  email: string;
  password: string;
}

@Controller()
export class AuthController {
  @Get('/health')
  health() {
    return { status: 'auth-service ok', service: 'auth', port: 4001 };
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    // Dummy login for now
    return {
      message: 'login success',
      user: { email: body.email },
      token: 'fake-jwt-token',
    };
  }
}
