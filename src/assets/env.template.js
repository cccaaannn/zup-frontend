(function (window) {
    window.env = window.env || {};
    window["env"]["USER_SERVICE_API_URL"] = '${USER_SERVICE_API_URL}';
    window["env"]["MESSAGE_SERVICE_API_URL"] = '${MESSAGE_SERVICE_API_URL}';
    window["env"]["MESSAGE_SERVICE_WEBSOCKET_URL"] = '${MESSAGE_SERVICE_WEBSOCKET_URL}';
})(this);