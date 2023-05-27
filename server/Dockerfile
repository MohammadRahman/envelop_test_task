FROM node:latest
WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
EXPOSE 3009
CMD ["yarn", "start"]
# FROM node:latest
# WORKDIR /app
# COPY package.json ./
# RUN yarn
# RUN yarn start