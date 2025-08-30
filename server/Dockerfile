# Use Node.js official image
FROM node:20

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json first (to use Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 4000

RUN apt-get update && apt-get install -y netcat-openbsd
# copy wait-for-it script into container
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh   # runs inside container, not Windows
# Run backend
CMD ["npm", "run", "dev"]
