FROM node:alpine as build

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build


FROM nginx:1.21
RUN apt-get update \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/*
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html 



# # Dockerfile for the Vue.js frontend
# FROM node:alpine

# WORKDIR /app

# # Copy package.json and package-lock.json to install dependencies
# COPY package.json yarn.lock ./

# # Install dependencies
# # RUN npm ci --only=production
# RUN yarn install --frozen-lockfile

# # Install the serve package globally
# RUN yarn global add serve

# # Copy the rest of the application code
# COPY . .

# # Build the frontend app
# RUN yarn build

# # Expose the frontend port (change PORT_NUMBER to the actual port used by your frontend)
# EXPOSE 5173

# # Start the frontend server
# CMD [ "serve", "-s", "dist" ]
