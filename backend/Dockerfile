FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 10000

CMD ["node", "dist/server.js"]
