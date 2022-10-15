export const environment = {
  userServiceApiUrl: (window as { [key: string]: any })["env"]["USER_SERVICE_API_URL"] as string,
  messageServiceApiUrl: (window as { [key: string]: any })["env"]["MESSAGE_SERVICE_API_URL"] as string,
  messageServiceWebsocketUrl: (window as { [key: string]: any })["env"]["MESSAGE_SERVICE_WEBSOCKET_URL"] as string,
  production: true
};
