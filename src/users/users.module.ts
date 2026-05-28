import { Module } from "@nestjs/common";
import { User } from "./entity/users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SecurityModule } from "src/security/security.module";
import { EmailService } from "src/security/email/email.service";
import { PasswordService } from "src/security/password/password.service";

@Module({
  imports: [SequelizeModule.forFeature([User]), SecurityModule],
  providers: [UsersService, PasswordService, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}
