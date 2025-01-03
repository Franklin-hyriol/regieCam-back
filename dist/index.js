"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const camRoute_1 = __importDefault(require("./routes/camRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const app = (0, express_1.default)();
//ssh username@hostname -p port_number
// Middleware pour parser les requêtes JSON
app.use(body_parser_1.default.json());
// Configuration CORS pour toutes les requêtes
app.use((0, cors_1.default)());
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
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
app.use('/api/v1/', (0, camRoute_1.default)(io));
app.use('/api/v1/', adminRoute_1.default);
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
