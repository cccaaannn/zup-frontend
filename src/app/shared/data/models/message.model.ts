export interface MessageModel {
    id: number,
    createdAt: string,
    readAt: string,
    fromId: number,
    toId: number,
    messageText: string,
    messageStatus: number,
    messageType: string
}