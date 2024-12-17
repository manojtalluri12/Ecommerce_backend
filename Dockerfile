# Stage 1: Build the application
FROM node:14 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Create a smaller runtime image
FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

EXPOSE 5000

CMD ["node", "server.js"]
