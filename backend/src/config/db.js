const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Intentando conectar a la base de datos...');
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestion_restaurante');
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
