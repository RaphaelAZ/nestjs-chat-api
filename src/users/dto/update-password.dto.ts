import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdatePasswordDto extends PartialType(
  OmitType(CreateUserDto, ["email", "username"] as const),
) {}
