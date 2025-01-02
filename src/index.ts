import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import camRoute from './routes/camRoute';
import adminRoute from './routes/adminRoute';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
//ssh username@hostname -p port_number

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Configuration CORS pour toutes les requêtes
app.use(cors());


const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*',
    },
    connectionStateRecovery: {}
});

// Route de test
app.get('/', (req, res) => {
    res.send('Serveur de la régie CAM');
});

// Utilisation des routes définies dans userRoutes
app.use('/api/v1/', camRoute(io));

app.use('/api/v1/', adminRoute);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
