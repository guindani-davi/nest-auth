import { Injectable } from "@nestjs/common";

import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "src/database/types";

@Injectable()
export class DatabaseService extends SupabaseClient<Database> {
	constructor() {
		super(
			process.env.SUPABASE_URL as string,
			process.env.SUPABASE_SERVICE_ROLE_KEY as string,
		);
	}
}
