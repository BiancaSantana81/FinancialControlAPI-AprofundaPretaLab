import express from 'express';
import { financialRoutes} from '../../app/controllers/routes/financialRoutes';

const app = express();
app.use(express.json());

app.use('/', financialRoutes);


export default app;