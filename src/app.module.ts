import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseService } from "src/database/database.service";
import { ProtectedController } from "./protected/protected.controller";
import { ProtectedModule } from "./protected/protected.module";

@Module({
	controllers: [AppController, ProtectedController],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		ProtectedModule,
	],
	providers: [AppService, DatabaseService],
})
export class AppModule {}
