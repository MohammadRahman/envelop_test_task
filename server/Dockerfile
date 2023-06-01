# Dockerfile for the NestJS backend
FROM node:alpine

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
# RUN Copy the rest of the application code
RUN yarn install --frozen-lockfile

# 
COPY . .

# Expose the backend port (change PORT_NUMBER to the actual port used by your backend)
EXPOSE 3009

# Start the backend
CMD ["node", "dist/main"]
