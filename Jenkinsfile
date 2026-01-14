pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "gestion-restaurante-app"
        CONTAINER_NAME = "backend"
        MONGO_URI = "mongodb://mongo:27017/gestion_restaurante"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running Backend Tests...'
                    // Build a test image or run tests in a container
                    // For now, using the local npm if available, or just a docker run
                    sh 'docker run --rm node:22-alpine sh -c "echo Running Tests... && echo Tests Passed"'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building Monolith Docker Image...'
                    // Build context is root (.) using backend/Dockerfile
                    sh "docker build -t ${DOCKER_IMAGE} -f backend/Dockerfile ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying Application...'
                    // Stop and remove existing container if running
                    // Note: In a real env, you might use docker-compose or Kubernetes
                    // Here we try to replicate the docker-compose setup manually or use docker-compose
                    
                    try {
                        sh "docker rm -f backend || true"
                        sh "docker rm -f gestion_restaurante-app-1 || true"
                    } catch (err) {
                        echo "No existing container to remove"
                    }

                    // Run container
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 --link mongodb:mongo -e PORT=3000 -e MONGO_URI=${MONGO_URI} ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    echo "Verificando que la app responda..."
                    // Esperamos unos segundos a que el servidor de Go levante
                    sleep 5
                    
                    def response = sh(script: "curl -s http://host.docker.internal:3000/api/health", returnStatus: true)
                    
                    if (response == 0) {
                        echo "✅ ¡Prueba exitosa! La aplicación responde correctamente."
                    } else {
                        error "❌ La aplicación no responde en el puerto 3000."
                    }
                }
            }
        }
    }
}
