FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

FROM node:22-alpine AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 5001

CMD ["npm", "run", "dev:watch"]

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 5001

CMD ["node", "dist/server.js"]
