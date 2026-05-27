import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { PasswordService } from "src/security/password/password.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly passwordService: PasswordService
    ) {}

    async getAllUsers() {
        try {
            return await this.userModel.findAll();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Unable to fetch users');
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.userModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Unable to fetch user');
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
            return await this.userModel.create({ ...createUserDto, password: hashedPassword });
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Unable to create user');
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            const hashedPassword = updateUserDto.password ? await this.passwordService.hashPassword(updateUserDto.password) : undefined;
            return await user.update({ ...updateUserDto, password: hashedPassword });
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Unable to update user');
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.userModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return await user.destroy();
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Unable to delete user');
        }
    }
}