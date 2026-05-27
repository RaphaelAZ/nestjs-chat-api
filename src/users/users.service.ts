import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User
    ) {}

    getAllUsers() {
        try {
            return this.userModel.findAll();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Unable to fetch users');
        }
    }

    getUserById(id: string) {
        try {
            return this.userModel.findByPk(id);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Unable to fetch user');
        }
    }

    createUser(createUserDto: CreateUserDto) {
        try {
            return this.userModel.create(createUserDto);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Unable to create user');
        }
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        try {
            return this.userModel.update(updateUserDto, { where: { id } });
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Unable to update user');
        }
    }

    deleteUser(id: string) {
        try {
            return this.userModel.destroy({ where: { id } });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Unable to delete user');
        }
    }
}