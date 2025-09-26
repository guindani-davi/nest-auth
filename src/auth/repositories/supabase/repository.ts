import { Injectable } from "@nestjs/common";

import type { RegisterDTO } from "src/auth/dtos";
import type { AuthRepository } from "src/auth/repositories/repository";
import type { DatabaseService } from "src/database/database.service";

@Injectable()
export class SupabaseAuthRepository implements AuthRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async register(data: RegisterDTO) {
		const { email, password } = data;

		await this.databaseService.from("users").insert({
			email,
			password,
		});
	}

	async findUserByEmail(email: string) {
		const { data } = await this.databaseService
			.from("users")
			.select("*")
			.eq("email", email)
			.single();

		return data;
	}
}
