import { Body, Controller, Post } from "@nestjs/common";

import type { AuthService } from "src/auth/auth.service";
import type { LoginDTO, RegisterDTO } from "src/auth/dtos";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async Register(@Body() body: RegisterDTO): Promise<void> {
		await this.authService.register(body);
	}

	@Post("login")
	async Login(@Body() body: LoginDTO): Promise<string> {
		return await this.authService.login(body);
	}
}
