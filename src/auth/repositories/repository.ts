import { RegisterDTO } from 'src/auth/dtos';
import { Database } from 'src/database/types';

export abstract class AuthRepository {
  abstract register(data: RegisterDTO): Promise<void>;
  abstract findUserByEmail(
    email: string,
  ): Promise<Database['public']['Tables']['users']['Row'] | null>;
}
