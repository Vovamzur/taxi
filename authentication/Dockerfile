FROM node:12
WORKDIR /microservices/authentication/src
COPY package*.json ./
RUN npm i
# RUN npm ci --only=production 
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]
