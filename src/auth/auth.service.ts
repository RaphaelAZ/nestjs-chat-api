import { InjectModel } from "@nestjs/sequelize";
import { LoginDto } from "./dto/login.dto";
import { User } from "src/users/entity/users.model";
import { PasswordService } from "src/security/password/password.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { Role } from "./entity/role.model";
import { Permission } from "./entity/permission.role";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmailWithPassword(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
      include: [
        {
          model: Role,
          through: { attributes: [] },
          include: [{ model: Permission, through: { attributes: [] } }],
        },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.dataValues.password) {
      throw new Error("User password not set");
    }
    if (
      !(await this.passwordService.verifyPassword(
        user.dataValues.password,
        loginDto.password,
      ))
    ) {
      throw new Error("Invalid password");
    }
    return this.generateToken(user);
  }

  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      username,
    });
    return this.generateToken(newUser);
  }

  async generateToken(user: User) {
    return this.jwtService.signAsync({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userId: user.id,
      roles:
        user.roles?.map((role) => ({
          name: role.name,
          code: role.code,
          permissions:
            role.permissions?.map((permission) => permission.name) ?? [],
        })) ?? [],
    });
  }
}
