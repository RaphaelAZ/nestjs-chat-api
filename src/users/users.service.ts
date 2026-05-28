import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entity/users.model";
import { PasswordService } from "src/security/password/password.service";
import { EmailService } from "src/security/email/email.service";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly passwordService: PasswordService,
    private readonly emailService: EmailService,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.userModel.findAll({
        attributes: { exclude: ["password"] },
        raw: true,
      });

      return users.map((user) => ({
        ...user,
        email: this.emailService.maskEmail(user.email),
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users");
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findByPk(id, {
        attributes: { exclude: ["password"] },
        raw: true,
      });
      if (!user) {
        throw new Error("User not found");
      }
      return {
        ...user,
        email: this.emailService.maskEmail(user.email),
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Unable to fetch user");
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        createUserDto.password,
      );
      return await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Unable to create user");
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return await user.update(updateUserDto);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Unable to update user");
    }
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      const hashedPassword = updatePasswordDto.password
        ? await this.passwordService.hashPassword(updatePasswordDto.password)
        : undefined;
      return await user.update({ password: hashedPassword });
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error("Unable to update password");
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return await user.destroy();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Unable to delete user");
    }
  }
}
