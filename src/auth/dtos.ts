import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class LoginDTO {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
