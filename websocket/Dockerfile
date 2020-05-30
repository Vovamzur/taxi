FROM node:12
WORKDIR /microservices/websocket/src
COPY package*.json ./
RUN npm i
# RUN npm ci --only=production 
COPY . .
EXPOSE 5002
CMD ["npm", "run", "dev"]
