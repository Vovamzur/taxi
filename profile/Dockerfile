FROM node:12
WORKDIR /microservices/profile/src
COPY package*.json ./
RUN npm i
# RUN npm ci --only=production 
COPY . .
EXPOSE 5001
CMD ["npm", "run", "dev"]
