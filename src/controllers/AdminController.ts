import { Request, Response } from 'express';
import Admin from '../models/admin';

// // update Cam use
export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const admin = await Admin.findByPk(1); // Trouve l'utilisateur par ID
        if (!admin) {
            const newCam = await Admin.create({
                free: true,
            });

            res.status(200).json({
                free: false,
                message: 'Admin created successfully.',
            })
            return;
        }

        if (admin.free) {
            res.status(200).json({
                free: true,
                message: 'you are already admin.',
            })
        } else {
            admin.free = true;
            await admin.save();
            res.status(200).json({
                free: false,
                message: 'you are admin now.',
            });

        }

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
        return;
    }
}


export const disconnectAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const admin = await Admin.findByPk(1); // Trouve l'utilisateur par ID
        if (!admin) {
            res.status(404).json({ message: 'Admin not found.' });
            return;
        }

        admin.free = false;

        await admin.save();

        res.status(200).json({
            message: 'you are not admin now.',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
}

