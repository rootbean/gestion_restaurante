#!/bin/bash
docker run --name mongodb -d -p 27017:27017 -v mongo_data:/data/db mongo:6.0
echo "MongoDB corriendo en puerto 27017"
