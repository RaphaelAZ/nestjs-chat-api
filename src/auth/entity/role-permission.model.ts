import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Permission } from "./permission.role";
import { Role } from "./role.model";

@Table({ tableName: "permission_roles" })
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column({ allowNull: false })
  roleId: number;

  @ForeignKey(() => Permission)
  @Column({ allowNull: false })
  permissionId: number;
}
