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
exports.disconnectAdmin = exports.updateAdmin = void 0;
const admin_1 = __importDefault(require("../models/admin"));
// // update Cam use
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findByPk(1); // Trouve l'utilisateur par ID
        if (!admin) {
            const newCam = yield admin_1.default.create({
                free: true,
            });
            res.status(200).json({
                free: false,
                message: 'Admin created successfully.',
            });
            return;
        }
        if (admin.free) {
            res.status(200).json({
                free: true,
                message: 'you are already admin.',
            });
        }
        else {
            admin.free = true;
            yield admin.save();
            res.status(200).json({
                free: false,
                message: 'you are admin now.',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
        return;
    }
});
exports.updateAdmin = updateAdmin;
const disconnectAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findByPk(1); // Trouve l'utilisateur par ID
        if (!admin) {
            res.status(404).json({ message: 'Admin not found.' });
            return;
        }
        admin.free = false;
        yield admin.save();
        res.status(200).json({
            message: 'you are not admin now.',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
});
exports.disconnectAdmin = disconnectAdmin;
