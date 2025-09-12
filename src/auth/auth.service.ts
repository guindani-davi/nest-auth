import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from 'src/auth/repositories/repository';
import { LoginDTO, RegisterDTO } from 'src/auth/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDTO): Promise<void> {
    registerData.password = await this.HashPassword(registerData.password);

    await this.authRepository.register(registerData);
  }

  private async HashPassword(password: string) {
    const passwordWithPepper = this.PepperPassword(password);
    const hashedSaltedPassword = bcrypt.hash(passwordWithPepper, 1);
    return hashedSaltedPassword;
  }

  private PepperPassword(password: string) {
    return password + process.env.AUTH_PEPPER;
  }

  async login(loginData: LoginDTO): Promise<string> {
    const user = await this.authRepository.findUserByEmail(loginData.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordWithPepper = this.PepperPassword(loginData.password);
    const equalPasswords = await bcrypt.compare(
      passwordWithPepper,
      user.password,
    );

    if (!equalPasswords) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return accessToken;
  }
}
