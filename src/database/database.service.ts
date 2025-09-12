import { Injectable } from '@nestjs/common';

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/database/types';

@Injectable()
export class DatabaseService extends SupabaseClient<Database> {
  constructor() {
    super(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  }
}
