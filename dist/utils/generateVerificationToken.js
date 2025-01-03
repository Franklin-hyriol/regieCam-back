"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationToken = void 0;
const crypto_1 = require("crypto");
const generateVerificationToken = (length = 32) => {
    return (0, crypto_1.randomBytes)(length).toString('hex');
};
exports.generateVerificationToken = generateVerificationToken;
