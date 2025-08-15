# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Install application dependencies
COPY package*.json .
RUN npm install
RUN npm install -g nodemon