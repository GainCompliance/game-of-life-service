# docker build . -t gain-game-of-life && docker run -p 8080:8080 --rm gain-game-of-life
FROM node:16-slim as package-image
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

FROM node:16-slim as final-image

WORKDIR /app
COPY --from=package-image /app/node_modules /app/node_modules
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY server.js /app/server.js
COPY game-of-life-world.js /app/game-of-life-world.js
COPY viewer.html /app/viewer.html

EXPOSE 8080

CMD ["npm", "run", "server"]
