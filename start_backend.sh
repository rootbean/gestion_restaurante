#!/bin/bash
# Construir la imagen (contexto debe ser la raíz del proyecto para incluir frontend y backend)
echo "Construyendo imagen del backend (Monolito)..."
docker build -t gestion-app -f backend/Dockerfile .

# Correr el contenedor linkeado a mongo
echo "Iniciando contenedor..."
docker run --name backend \
  -d \
  -p 3000:3000 \
  --link mongodb:mongo \
  -e PORT=3000 \
  -e MONGO_URI=mongodb://mongo:27017/gestion_restaurante \
  gestion-app

echo "Backend corriendo en http://localhost:3000"
