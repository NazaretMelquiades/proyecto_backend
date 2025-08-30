const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación generada automáticamente con Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Cambia la URL según tu entorno
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a los archivos donde documentarás tus endpoints
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;