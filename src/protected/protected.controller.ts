import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { AuthGuard } from "src/auth/auth.guard";

@Controller("protected")
export class ProtectedController {
	@UseGuards(AuthGuard)
	@Get("dashboard")
	Dashboard(@Request() request): string {
		return request.user;
	}
}
