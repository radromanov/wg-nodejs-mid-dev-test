# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Copy shared/ files
COPY ../shared ./shared

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code

COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["pnpm", "dev"]

