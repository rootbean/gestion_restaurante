# Stage 1: Build Frontend
FROM node:22-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Setup Backend
FROM node:22-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Copy Frontend Build to Backend Public
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]
