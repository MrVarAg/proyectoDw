import conexion from '../models/conexion.js';

export const postAula = async (req, res) => { 
    const { nomAula } = req.body;
    try {
        const insertQuery = `INSERT INTO aula (nomAula) VALUES (?)`;
        await conexion.query(insertQuery, [nomAula]);
        res.status(201).json({ message: 'Aula agregada exitosamente' });
    } catch (error) {
        console.error('Error al agregar el aula:', error);
        res.status(500).json({ error: 'Error al agregar el aula' });
    }
};