FROM node:12
WORKDIR /microservices/web-client/src
COPY package*.json ./
RUN npm i
# RUN npm ci --only=production 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
