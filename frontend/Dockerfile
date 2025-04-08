# Use Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Expose Metro bundler port
EXPOSE 8081

# Start Metro bundler
CMD ["npm", "start"]
