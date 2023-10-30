import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger'; // Se você criou a configuração do Swagger
import appRoutes from './routes/app'; // Importando as rotas
import { AppDataSource } from './data-source'; // Importando a inicialização do banco de dados

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Configuração do Swagger (se você implementou)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usando as rotas definidas em app.ts
app.use(appRoutes);

// Inicialização do banco de dados e, em seguida, do servidor
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
