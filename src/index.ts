import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger'; 
import appRoutes from './routes/app'; 
import { AppDataSource } from './data-source';

const app = express();
const port = 3000;

app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(appRoutes);


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
