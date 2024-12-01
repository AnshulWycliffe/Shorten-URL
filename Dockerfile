# Use the official Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files for efficient caching
COPY package*.json ./

# Install only production dependencies to keep the image size smaller
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Ensure static assets are handled correctly (if applicable)
RUN mkdir -p /app/public && cp -r ./public /app/public

# Expose the port that the application runs on
# Ensure this matches the port your app uses (3000 or change app code to use 5000)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run the application
CMD ["node", "src/index.js"]
