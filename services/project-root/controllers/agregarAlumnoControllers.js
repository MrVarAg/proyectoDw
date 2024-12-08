import conexion from "../models/conexion.js";

export const getCarreras = async (req, res) => {
    try {
        const selectQuery = `
            SELECT idCarrera, nomCarrera
            FROM carrera
        `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar las carreras:', error);
        res.status(500).json({ error: 'Error al consultar las carreras' });
    }
};
export const postAlumno = async (req, res) => {
    const { numCuenta, nombre, apellido, correo, activo, idCarrera } = req.body;
    try {
        if (!numCuenta || !nombre || !apellido || !correo || activo === undefined || !idCarrera) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }
        const insertPersona = `
          INSERT INTO persona (numCuenta, nombre, apellido, correo, activo) 
          VALUES (?, ?, ?, ?, ?)
        `;
        const insertAlumno = `
          INSERT INTO alumno (numCuenta, idCarrera)
          VALUES (?, ?)
        `;
        await conexion.query(insertPersona, [numCuenta, nombre, apellido, correo, activo]);
        await conexion.query(insertAlumno, [numCuenta, idCarrera]);
        res.status(201).json({ message: 'Alumno agregado exitosamente' });

    }
    catch (error) {
        console.error('Error al agregar el alumno:', error);
        res.status(500).json({ error: 'Error al agregar el alumno' });
    }
};