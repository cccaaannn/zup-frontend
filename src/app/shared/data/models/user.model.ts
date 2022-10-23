import { UserStatus } from "../enums/user-status";
import { RoleModel } from "./role.model";
import { UserOnlineStatusModel } from "./user-online-status.model";

export interface UserModel {
    id: number,
    username: string,
    email: string,
    userStatus: UserStatus,
    role: RoleModel,
    userOnlineStatus: UserOnlineStatusModel
}