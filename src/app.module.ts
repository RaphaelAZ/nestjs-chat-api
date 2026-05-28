import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/entity/users.model";
import { SecurityModule } from "./security/security.module";
import { AuthModule } from "./auth/auth.module";
import { Permission } from "./auth/entity/permission.role";
import { Role } from "./auth/entity/role.model";
import { RolePermission } from "./auth/entity/role-permission.model";
import { UserRole } from "./users/entity/user-role.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "secuweb-chat-api",
      models: [User, Role, Permission, UserRole, RolePermission],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    SecurityModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
