FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:orders
EXPOSE 4003
CMD ["node", "dist/apps/orders/main.js"]
