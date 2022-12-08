# zup-frontend

### Angular frontend for zup application.

---
![GitHub top language](https://img.shields.io/github/languages/top/cccaaannn/zup-frontend?style=flat-square) ![](https://img.shields.io/github/repo-size/cccaaannn/zup-frontend?style=flat-square) [![GitHub license](https://img.shields.io/github/license/cccaaannn/zup-frontend?style=flat-square)](https://github.com/cccaaannn/zup-frontend/blob/master/LICENSE)

### zup is a messaging application, built by microservice architecture.
### Services
- [Frontend](https://github.com/cccaaannn/zup-frontend) (This project)
- [User service](https://github.com/cccaaannn/zup-user-service)
- [Message service](https://github.com/cccaaannn/zup-message-service)

<hr>

### Configurations
1. Api paths can be changed under `assets/env.js` or via setting evn variables.

<hr>

## Running with Docker
1. Build
```shell
docker build -t cccaaannn/zup-frontend:latest .
```

2. Run
```shell
docker run -d --name zup-frontend -p 80:80 cccaaannn/zup-frontend:latest
```
- Or with environments
```shell
docker run -d --name zup-frontend -p 80:80 -e USER_SERVICE_API_URL=<...> -e MESSAGE_SERVICE_API_URL=<...> -e MESSAGE_SERVICE_WEBSOCKET_URL=<...> cccaaannn/zup-frontend:latest
```

## Running Native
1. Build
```shell
npm i
npm run build
```

2. Run
- Run it with [nginx](https://www.nginx.com/)
