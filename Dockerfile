FROM mhart/alpine-node:8
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

FROM mhart/alpine-node:base-8
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 8080
CMD ["npm", "start"]