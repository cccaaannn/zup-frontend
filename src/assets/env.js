(function (window) {
    window["env"] = window["env"] || {};
    window["env"]["USER_SERVICE_API_URL"] = 'http://localhost:8080/api/user/v1';
    window["env"]["MESSAGE_SERVICE_API_URL"] = 'http://localhost:8081/api/message/v1';
    window["env"]["MESSAGE_SERVICE_WEBSOCKET_URL"] = 'ws://localhost:8081/api/message/v1';
})(this);