import conexion from '../models/conexion.js';

export const postClaseCarrera = async (req, res) => {
    const {idClase, nomClase, idCarrera} = req.body;
    try {
        if (!idClase || !nomClase || !idCarrera) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }
        const insertQuery = `
            INSERT INTO clase (idClase, nomClase, idCarrera)
            VALUES (?, ?, ?)
        `;
        await conexion.query(insertQuery, [idClase, nomClase, idCarrera]);
        res.status(201).json({ message: 'Clase con carrera agregada exitosamente' });
    } catch (error) {
        console.error('Error al agregar la clase con carrera:', error);
        res.status(500).json({ error: 'Error al agregar la clase con carrera' });
    }
};
