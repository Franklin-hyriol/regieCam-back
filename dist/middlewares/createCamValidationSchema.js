"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCamValidationSchema = void 0;
exports.createCamValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Name is required.'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Name cannot be longer than 255 characters.'
        },
    },
};
