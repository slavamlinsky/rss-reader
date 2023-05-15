FROM node:16-slim
WORKDIR /src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD [ "npm", "start" ]