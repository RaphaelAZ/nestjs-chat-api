import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
}

export type UserCreateAttributes = Omit<IUser, 'id'>;

@Table
export class User extends Model<User, UserCreateAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}