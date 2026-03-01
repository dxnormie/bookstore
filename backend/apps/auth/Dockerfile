FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:auth

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps 
COPY --from=builder /app/dist/apps/auth ./dist/apps/auth

EXPOSE 4001
CMD ["node", "dist/apps/auth/main"]
