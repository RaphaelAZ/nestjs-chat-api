import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/auth/entity/role.model";
import { User } from "./users.model";

@Table({ tableName: "user_roles" })
export class UserRole extends Model {
  @ForeignKey(() => Role)
  @Column({ allowNull: false })
  roleId: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
}
