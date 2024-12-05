import conexion from "../models/conexion.js";

export const postAgregarSeccion = async (req, res) => {
    try {
        const { nomSeccion } = req.body;
        const insertQuery = `
            INSERT INTO seccion (nomSeccion)
            VALUES (?)
        `;
        await conexion.query(insertQuery, [nomSeccion]);
        res.status(201).json({ message: 'Sección agregada' });
    } catch (error) {
        console.error('Error al agregar la sección:', error);
        res.status(500).json({ error: 'Error al agregar la sección' });
    }
}