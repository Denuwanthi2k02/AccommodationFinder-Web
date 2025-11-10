FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]
