

import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Minha API',
            version: '1.0.0',
            description: 'Documentação da API de Produtos',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/*.ts', './src/entity/*.yml'],

};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
