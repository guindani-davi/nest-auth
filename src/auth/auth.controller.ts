import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { LoginDTO, RegisterDTO } from 'src/auth/dtos';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async Register(@Body() body: RegisterDTO): Promise<void> {
    await this.authService.register(body);
  }

  @Post('login')
  async Login(@Body() body: LoginDTO): Promise<string> {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('dashboard')
  Dashboard(@Request() request): string {
    return request.user;
  }
}
