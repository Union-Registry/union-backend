# Dockerfile
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]