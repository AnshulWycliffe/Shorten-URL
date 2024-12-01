# Use the official Node.js LTS image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app's code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (can also be provided during runtime)
ENV NODE_ENV=production

# Run the application
CMD ["node", "src/index.js"]
