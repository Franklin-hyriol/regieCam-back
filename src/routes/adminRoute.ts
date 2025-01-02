import express from 'express';
import { disconnectAdmin, updateAdmin } from '../controllers/AdminController';

// Crée une instance du routeur Express
const router = express.Router();

// update Admin
router.get("/updateadmi", updateAdmin);

router.get("/disconnect", disconnectAdmin);


export default router;