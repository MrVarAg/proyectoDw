import express from 'express';
import cors from 'cors';
import asignarClaseRoutes from './routes/asignarClaseRoutes.js';
import agregarSeccionRoutes from './routes/agregarSeccionRoutes.js';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', asignarClaseRoutes);
app.use('/api', agregarSeccionRoutes);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});