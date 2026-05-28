import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Permission } from "./permission.role";
import { RolePermission } from "./role-permission.model";

@Table({
  tableName: "roles",
})
export class Role extends Model {
  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: true, unique: true })
  code: string;

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions: Permission[];
}
