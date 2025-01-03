"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const syncDatabase_1 = __importDefault(require("../utils/syncDatabase"));
class Cam extends sequelize_1.Model {
}
// Initialisation du modèle Cam
Cam.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("red", "orange", "green", "blue"),
        allowNull: false,
        defaultValue: "green"
    },
    used: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'Cam',
    timestamps: false
});
// Synchronisation avec la base de données
(0, syncDatabase_1.default)();
exports.default = Cam;
