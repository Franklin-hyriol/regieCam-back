"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
// Crée une instance du routeur Express
const router = express_1.default.Router();
// update Admin
router.get("/updateadmi", AdminController_1.updateAdmin);
router.get("/disconnect", AdminController_1.disconnectAdmin);
exports.default = router;
