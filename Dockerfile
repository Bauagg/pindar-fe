FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Create .npmrc file to handle legacy dependencies
RUN echo "legacy-peer-deps=true" > .npmrc

# Install dependencies with specific configurations
RUN npm install -g npm@latest && \
    npm install --legacy-peer-deps --no-audit && \
    npm install react-scripts@5.0.1 --save --legacy-peer-deps --no-audit && \
    npm install @babel/plugin-proposal-private-property-in-object --save-dev --legacy-peer-deps --no-audit

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
