import sequelize from '../config/database';

const syncDatabase = async () => {
    try {
        // Synchronisation de la base de données | { alter: true } permet de modifier les tables existantes | { force: true } Permet de supprimer les tables existantes
        await sequelize.sync({ alter: true });
        console.log('The database has been successfully synchronized');
    } catch (error) {
        console.error('An error occurred while synchronizing the database:', error);
    }
};

export default syncDatabase;