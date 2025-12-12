# Etapa 1: Build del Frontend
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servir con NGINX
FROM nginx:alpine

COPY --from=builder /app/dist/cliente/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
