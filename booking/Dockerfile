FROM node:12
WORKDIR /microservices/booking/src
COPY package*.json ./
RUN npm i
# RUN npm ci --only=production 
COPY . .
EXPOSE 3003
CMD ["npm", "run", "start"]
