import { Request, Response } from 'express';
import Cam from '../models/Cam';
import { validationResult } from 'express-validator';



// Créer un nouvel utilisateur
export const createCam = async (req: Request, res: Response): Promise<void> => {
    const validation = validationResult(req);
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
        const existingUser = await Cam.findOne({ where: { name } });
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
        const newCam = await Cam.create({
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


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: {
                    message: error.message,
                    stack: error.stack
                }
            });
        } else {
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
};

// // get all camera
export const getAllCam = async (req: Request, res: Response): Promise<void> => {
    try {
        const cams = await Cam.findAll();
        res.status(200).json(cams);
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
};

// get cam by id
export const getCamById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    try {
        const cam = await Cam.findByPk(userId, {
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
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
};


// deleta cam by id
export const deleteCamById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    try {
        const cam = await Cam.findByPk(userId);
        if (!cam) {
            res.status(404).json({ message: 'Cam not found' });
            return;
        }

        if (cam.used) {
            res.status(204).json({ message: 'Cam is used' });
            return;
        }

        await cam.destroy();
        res.status(200).json({ message: 'Cam deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
}

// // update Cam used
export const updateCamUsed = async (req: Request, res: Response): Promise<void> => {

    const camId = req.params.id; // Récupère l'ID de l'utilisateur à mettre à jour

    try {
        const cam = await Cam.findByPk(camId); // Trouve l'utilisateur par ID
        if (!cam) {
            res.status(404).json({ message: 'Cam not found.' });
            return;
        }

        cam.used = !cam.used;

        await cam.save();
        res.status(200).json({
            message: 'Cam updated successfully.',
            user: {
                id: cam.id,
                name: cam.name,
                status: cam.status,
                used: cam.used
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
}

// // Méthode pour modifier le cam
export const updateCam = async (req: Request, res: Response): Promise<void> => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
        return;
    }

    const camId = req.params.id; // Récupère l'ID de l'utilisateur à mettre à jour
    const { name, status } = req.body;


    try {
        const cam = await Cam.findByPk(camId); // Trouve l'utilisateur par ID
        if (!cam) {
            res.status(404).json({ message: 'Cam not found.' });
            return;
        }

        const camWithRedStatus = await Cam.findOne({ where: { status: "red" } });

        if (camWithRedStatus && status != "orange") {
            camWithRedStatus.status = "green";
        }

        await camWithRedStatus?.save();

        if (name) { cam.name = name; cam.used = false }

        if (status) {
            cam.status = status;
        }
        await cam.save();

        res.status(200).json({
            message: 'Cam updated successfully.',
            user: {
                id: cam.id,
                name: cam.name,
                status: cam.status,
                used: cam.used
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
}