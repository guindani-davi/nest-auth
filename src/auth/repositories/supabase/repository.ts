import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { AuthRepository } from 'src/auth/repositories/repository';
import { RegisterDTO } from 'src/auth/dtos';

@Injectable()
export class SupabaseAuthRepository implements AuthRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(data: RegisterDTO) {
    const { email, password, name, last_name } = data;

    await this.databaseService.from('users').insert({
      email,
      password,
      name,
      last_name,
    });
  }

  async findUserByEmail(email: string) {
    const { data } = await this.databaseService
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    return data;
  }
}
