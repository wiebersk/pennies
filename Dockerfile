FROM mhart/alpine-node:8

WORKDIR /app

COPY . .
RUN yarn install

EXPOSE 8080

CMD ["npm", "start"]