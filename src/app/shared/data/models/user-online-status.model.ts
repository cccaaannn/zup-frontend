import { OnlineStatus } from "../enums/online-status";

export interface UserOnlineStatusModel {
    id: number,
    onlineStatus: OnlineStatus
    lastOnline: Date
}