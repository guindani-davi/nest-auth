import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthRepository } from 'src/auth/repositories/repository';
import { SupabaseAuthRepository } from 'src/auth/repositories/supabase/repository';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    AuthService,
    DatabaseService,
    {
      provide: AuthRepository,
      useClass: SupabaseAuthRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
