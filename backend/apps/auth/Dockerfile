FROM node:18-alpine
WORKDIR /app
COPY package*.json ./       
RUN npm install
COPY . .                    
RUN npm run build:auth      
EXPOSE 4001
CMD ["node", "dist/apps/auth/main.js"]
