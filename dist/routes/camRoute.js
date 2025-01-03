"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const createCamValidationSchema_1 = require("../middlewares/createCamValidationSchema");
const camController_1 = require("../controllers/camController");
const updateCamValidationSchema_1 = require("../middlewares/updateCamValidationSchema");
// Crée une instance du routeur Express
exports.default = (io) => {
    const router = express_1.default.Router();
    // Route pour créer un camera
    router.post('/createcam', (0, express_validator_1.checkSchema)(createCamValidationSchema_1.createCamValidationSchema), camController_1.createCam);
    // Route pour obtenir tous les camera
    router.get("/getallcam", camController_1.getAllCam);
    // get cam by id
    router.get("/getcam/:id", camController_1.getCamById);
    //delete cam by id
    router.delete("/deletecam/:id", camController_1.deleteCamById);
    router.patch("/updatecamUsed/:id", camController_1.updateCamUsed);
    // update cam
    router.patch("/updatecamName/:id", (0, express_validator_1.checkSchema)(updateCamValidationSchema_1.updateCamValidationSchema), camController_1.updateCam);
    io.on('connection', (socket) => {
        socket.on('signal', (data) => {
            socket.broadcast.emit('signal', data);
        });
    });
    return router;
};
