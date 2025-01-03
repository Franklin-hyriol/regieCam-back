"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Création de l'instance Sequelize
const sequelize = new sequelize_1.Sequelize(process.env.AIVEN_DATABASE, process.env.AIVEN_USER, process.env.AIVEN_PASSWORD, {
    host: process.env.AIVEN_HOST,
    port: parseInt(process.env.AIVEN_PORT),
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false
});
exports.default = sequelize;
