import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProtectedController } from "./protected.controller";
import { ProtectedService } from "./protected.service";

@Module({
	controllers: [ProtectedController],
	imports: [ConfigModule.forRoot()],
	providers: [ProtectedService],
})
export class ProtectedModule {}
