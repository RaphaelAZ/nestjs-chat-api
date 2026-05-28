import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SecurityModule } from "src/security/security.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/entity/users.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SecurityModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "dev-jwt-secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
