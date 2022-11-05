# Build stage
FROM node:latest as builder
WORKDIR /zup

# Install dependencies
COPY ./package.json .
RUN npm install

# Build app
COPY . .
RUN npm run build


# Run stage
FROM nginx:latest

# Set api urls either here or before running
# ENV USER_SERVICE_API_URL=http://localhost:8080/api/v1
# ENV MESSAGE_SERVICE_API_URL=http://localhost:8081/api/v1
# ENV MESSAGE_SERVICE_WEBSOCKET_URL=ws://localhost:8081/api/v1

# Copy nginx config file for redirecting all requests to index.html
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the build output
COPY --from=builder /zup/dist/zup-frontend /usr/share/nginx/html

# Set run command, replace api urls before running.
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]