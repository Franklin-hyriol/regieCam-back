"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCam = exports.updateCamUsed = exports.deleteCamById = exports.getCamById = exports.getAllCam = exports.createCam = void 0;
const Cam_1 = __importDefault(require("../models/Cam"));
const express_validator_1 = require("express-validator");
// Créer un nouvel utilisateur
const createCam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = (0, express_validator_1.validationResult)(req);
    if (!validation.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: "Bad request",
            errors: validation.array()
        });
        return;
    }
    const { name } = req.body;
    try {
        // Vérifie si le nom est déjà utilisé
        const existingUser = yield Cam_1.default.findOne({ where: { name } });
        if (existingUser) {
            res.status(409).json({
                status: 409,
                message: 'Name already in use',
                error: [{
                        type: "field",
                        value: existingUser.name,
                        msg: "Name already in use.",
                        path: "name",
                        location: "body"
                    }]
            });
            return;
        }
        // Créer un nouvel utilisateur
        const newCam = yield Cam_1.default.create({
            name,
            status: "green",
            used: false
        });
        // Répondre avec l'utilisateur créé
        res.status(201).json({
            status: 201,
            message: 'User created successfully',
            user: {
                id: newCam.id,
                name: newCam.name,
                status: newCam.status,
                used: newCam.used,
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: {
                    message: error.message,
                    stack: error.stack
                }
            });
        }
        else {
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: {
                    message: 'Unknown error occurred',
                    stack: ''
                }
            });
        }
    }
});
exports.createCam = createCam;
// // get all camera
const getAllCam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cams = yield Cam_1.default.findAll();
        res.status(200).json(cams);
    }
    catch (error) {
        // console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});
exports.getAllCam = getAllCam;
// get cam by id
const getCamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const cam = yield Cam_1.default.findByPk(userId, {
            attributes: [
                "id",
                "name",
                "status",
                "used"
            ]
        });
        if (!cam) {
            res.status(404).json({ message: 'Cam not found' });
            return;
        }
        res.status(200).json(cam);
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});
exports.getCamById = getCamById;
// deleta cam by id
const deleteCamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const cam = yield Cam_1.default.findByPk(userId);
        if (!cam) {
            res.status(404).json({ message: 'Cam not found' });
            return;
        }
        if (cam.used) {
            res.status(204).json({ message: 'Cam is used' });
            return;
        }
        yield cam.destroy();
        res.status(200).json({ message: 'Cam deleted successfully' });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});
exports.deleteCamById = deleteCamById;
// // update Cam used
const updateCamUsed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const camId = req.params.id; // Récupère l'ID de l'utilisateur à mettre à jour
    try {
        const cam = yield Cam_1.default.findByPk(camId); // Trouve l'utilisateur par ID
        if (!cam) {
            res.status(404).json({ message: 'Cam not found.' });
            return;
        }
        cam.used = !cam.used;
        yield cam.save();
        res.status(200).json({
            message: 'Cam updated successfully.',
            user: {
                id: cam.id,
                name: cam.name,
                status: cam.status,
                used: cam.used
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
});
exports.updateCamUsed = updateCamUsed;
// // Méthode pour modifier le cam
const updateCam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = (0, express_validator_1.validationResult)(req);
    if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
        return;
    }
    const camId = req.params.id; // Récupère l'ID de l'utilisateur à mettre à jour
    const { name, status } = req.body;
    try {
        const cam = yield Cam_1.default.findByPk(camId); // Trouve l'utilisateur par ID
        if (!cam) {
            res.status(404).json({ message: 'Cam not found.' });
            return;
        }
        const camWithRedStatus = yield Cam_1.default.findOne({ where: { status: "red" } });
        if (camWithRedStatus && status != "orange") {
            camWithRedStatus.status = "green";
        }
        yield (camWithRedStatus === null || camWithRedStatus === void 0 ? void 0 : camWithRedStatus.save());
        if (name) {
            cam.name = name;
            cam.used = false;
        }
        if (status) {
            cam.status = status;
        }
        yield cam.save();
        res.status(200).json({
            message: 'Cam updated successfully.',
            user: {
                id: cam.id,
                name: cam.name,
                status: cam.status,
                used: cam.used
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
});
exports.updateCam = updateCam;
