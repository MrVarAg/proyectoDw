import conexion from '../models/conexion.js';

export const agregarAlumnoAClase = async (req, res) => {
    const {idClaseAsignada, numCuenta}= req.body;
    try {
        const insertquery= `INSERT INTO relalumnoclase (idClaseAsignada, numCuenta) VALUES (?, ?)`;
        await conexion.query(insertquery, [idClaseAsignada, numCuenta]);
        res.json({message: 'Alumno agregado a clase'});
    }
    catch (error) {
        console.error('Error al agregar alumno a clase:', error);
        res.status(500).json({error: 'Error al agregar alumno a clase'});
    }
};
