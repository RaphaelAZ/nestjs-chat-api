import { Module } from "@nestjs/common";
import { PasswordService } from "./password/password.service";
import { EmailService } from "./email/email.service";

@Module({
  providers: [PasswordService, EmailService],
  exports: [PasswordService, EmailService],
})
export class SecurityModule {}
