# Use a specific version of node on Alpine for building the app
FROM node:14.15.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the application files to the container
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Use the Alpine version of Nginx for a smaller final image
FROM nginx:alpine

# Copy the built files from the builder stage to the Nginx serve directory
COPY --from=builder /app/dist/smart-home /usr/share/nginx/html

# Optional: If you have a custom Nginx configuration, copy it
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
