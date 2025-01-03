import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Création de l'instance Sequelize
const sequelize = new Sequelize(
    process.env.AIVEN_DATABASE!,
    process.env.AIVEN_USER!,
    process.env.AIVEN_PASSWORD,
    {
        host: process.env.AIVEN_HOST!,
        port: parseInt(process.env.AIVEN_PORT!),
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        logging: false
    }
);

export default sequelize;
