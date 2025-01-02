import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import syncDatabase from '../utils/syncDatabase';
import { CamAttributes, CamCreationAttribute } from '../interfaces/CamInterface';
import { AdminAttributes, AdminCreationAttributes } from '../interfaces/AdminInterface';

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public id!: number;
    public free!: boolean;
}

// Initialisation du modèle Cam
Admin.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    free: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: '',
    timestamps: false
});

// Synchronisation avec la base de données
syncDatabase();

export default Admin;
