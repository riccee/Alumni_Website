# Stage 1: Build the React app with Vite
FROM node:18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Use Nginx to serve the built static files
FROM nginx:latest
# Remove default Nginx static assets
RUN rm /usr/share/nginx/html/*
# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
