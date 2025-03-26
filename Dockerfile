# Base Image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
COPY ./ ./

# Expose port
EXPOSE 8000

# Default command
CMD ["npm", "start"]