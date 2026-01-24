FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Use the PORT variable from .env, defaulting to 5001 if not set
ARG PORT
ENV PORT=${PORT:-5001}
EXPOSE ${PORT}

# Run the application
CMD ["node", "src/app.js"]