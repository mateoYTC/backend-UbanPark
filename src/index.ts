import express from 'express';
import cors from 'cors';
import usuariosRouter from './routes/usuarios.route';
import reservasRouter from './routes/reservas.route'; // ← AGREGAR ESTE IMPORT

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/usuarios', usuariosRouter);
app.use('/api/reservas', reservasRouter); 
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});