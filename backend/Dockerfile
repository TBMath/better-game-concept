# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port that your API runs on (default for Express is 3000)
EXPOSE 3000

# Command to run your app using the generated "bin/www" file
CMD ["npm", "start"]
