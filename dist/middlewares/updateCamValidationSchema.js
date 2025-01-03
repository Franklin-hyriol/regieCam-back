"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCamValidationSchema = void 0;
exports.updateCamValidationSchema = {
    name: {
        optional: {
            options: { nullable: true }
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Name cannot be longer than 255 characters.'
        },
    },
    status: {
        isIn: {
            options: [['red', 'orange', 'green', 'blue']],
            errorMessage: 'Status must be one of "red", "orange", "green", or "blue".'
        },
        optional: {
            options: { nullable: true }
        }
    }
};
