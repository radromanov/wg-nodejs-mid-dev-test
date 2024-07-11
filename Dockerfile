FROM node:lts

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Define the command to run the app
CMD ["pnpm", "dev"]
