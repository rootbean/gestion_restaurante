# Sistema de Gestión de Restaurante

Este proyecto contiene el Backend (Node.js) y Frontend (React/Vite) del Sistema de Gestión de Restaurante.

## Ejecución con Scripts

Este proyecto utiliza scripts de shell para gestionar los contenedores de Docker individualmente.

### Pasos

1. **Iniciar MongoDB:**
   ```bash
   ./start_mongo.sh
   ```

2. **Iniciar Backend:**
   ```bash
   ./start_backend.sh
   ```
   Esto construirá la imagen del backend y la ejecutará enlazada al contenedor de MongoDB.

3. **Acceder a la aplicación:**
   - **Backend API:** [http://localhost:3000](http://localhost:3000)
```

## Pruebas (Backend)

El backend incluye pruebas de integración construidas con Jest y Supertest.

### Ejecutar Pruebas Manualmente

1. Navega al directorio backend:
   ```bash
   cd backend
   ```
2. Instala dependencias (si es primera vez):
   ```bash
   npm install
   ```
3. Ejecuta los tests:
   ```bash
   npm test
   ```

Esto ejecutará validaciones para:
- Conectividad de Health Check (`/api/health`)
- Endpoints de Autenticación (`/register` y `/login`)
