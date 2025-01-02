import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import syncDatabase from '../utils/syncDatabase';
import { CamAttributes, CamCreationAttribute } from '../interfaces/CamInterface';

class Cam extends Model<CamAttributes, CamCreationAttribute> implements CamAttributes {
    public id!: number;
    public name!: string;
    public status!: "red" | "orange" | "green" | "blue";
    public used!: boolean;
}

// Initialisation du modèle Cam
Cam.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("red", "orange", "green", "blue"),
        allowNull: false,
        defaultValue: "green"
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: 'Cam',
    timestamps: false
});

// Synchronisation avec la base de données
syncDatabase();

export default Cam;
