FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:inventory
EXPOSE 4002
CMD ["node", "dist/apps/inventory/main.js"]
