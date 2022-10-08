(function (window) {
    window.env = window.env || {};
    window["env"]["userServiceApiUrl"] = '${userServiceApiUrl}';
    window["env"]["messageServiceApiUrl"] = '${messageServiceApiUrl}';
    window["env"]["messageServiceWebsocketUrl"] = '${messageServiceWebsocketUrl}';
})(this);