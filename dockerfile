FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
RUN npm run build
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY .env .env
COPY prisma ./prisma
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate dev --name init && node dist/main"]
