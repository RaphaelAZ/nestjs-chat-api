import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    getAllUsers() {
        return [
            { id: "1", name: 'John Doe' },
            { id: "2", name: 'Jane Doe' },
        ];
    }

    getUserById(id: string) {
        const users = this.getAllUsers();
        return users.find(user => user.id === id);
    }

    createUser(user: CreateUserDto) {
        const users = this.getAllUsers();
        const newUser = { id: (users.length + 1).toString(), name: user.username };
        users.push(newUser);
        return newUser;
    }

    updateUser(id: string, user: UpdateUserDto) {
        const users = this.getAllUsers();
        const existingUser = users.find(u => u.id === id);
        if (existingUser) {
            existingUser.name = user.username;
            return existingUser;
        }
        return null;
    }

    deleteUser(id: string) {
        const users = this.getAllUsers();
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
}