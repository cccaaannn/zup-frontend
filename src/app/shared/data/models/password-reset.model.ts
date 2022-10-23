import { AccessTokenModel } from "./access-token.model";

export interface PasswordResetModel {
    accessToken: AccessTokenModel,
    password: string
}