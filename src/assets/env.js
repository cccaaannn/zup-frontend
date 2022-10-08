(function (window) {
    window["env"] = window["env"] || {};
    window["env"]["userServiceApiUrl"] = 'http://localhost:8080/api/v1';
    window["env"]["messageServiceApiUrl"] = 'http://localhost:8081/api/v1';
    window["env"]["messageServiceWebsocketUrl"] = 'ws://localhost:8081/api/v1';
})(this);