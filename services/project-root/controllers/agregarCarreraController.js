import conexion from "../models/conexion.js";

export const postCarrera = async (req, res) => {
    try {
        const { nomCarrera} = req.body;
        if (!nomCarrera) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }
        const insertQuery = `
            INSERT INTO carrera (nomCarrera)
            VALUES (?)
        `;
        await conexion.query(insertQuery, [nomCarrera]);
        res.status(201).json({ message: 'Carrera agregada exitosamente' });

    }
    catch (error) {
        console.error('Error al agregar la carrera:', error);
        res.status(500).json({ error: 'Error al agregar la carrera' });
    }
};