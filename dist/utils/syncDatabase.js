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
const database_1 = __importDefault(require("../config/database"));
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchronisation de la base de données | { alter: true } permet de modifier les tables existantes | { force: true } Permet de supprimer les tables existantes
        yield database_1.default.sync({ alter: true });
        console.log('The database has been successfully synchronized');
    }
    catch (error) {
        console.error('An error occurred while synchronizing the database:', error);
    }
});
exports.default = syncDatabase;
