# Stage 1: Build the React app with Vite
FROM node:lts-alpine as builder
WORKDIR /app
RUN npm install -g npm@latest
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Use Nginx to serve the built static files
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
