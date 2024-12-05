import conexion from "../models/conexion.js";

export const getClases = async (req, res) => {
    try {
        const selectQuery = `
            SELECT c.idClase, c.nomClase, ca.nomCarrera
            FROM clase c
            LEFT JOIN carrera ca ON c.idCarrera = ca.idCarrera
        `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar las clases:', error);
        res.status(500).json({ error: 'Error al consultar las clases' });
    }
};

export const getPeriodos = async (req, res) => {
    try {
        const selectQuery = `
            SELECT p.idPeriodo, p.nomPeriodo, p.fechaInicio, p.fechaFin
            FROM periodo p
            WHERE p.activo = 1
        `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar los periodos:', error);
        res.status(500).json({ error: 'Error al consultar los periodos' });
    }
};

export const getSecciones = async (req, res) => {
    try {
        const { idClase, idPeriodo } = req.query;
        const selectQuery = `
            SELECT s.idSeccion, s.nomSeccion
            FROM seccion s
            WHERE s.idSeccion NOT IN (
                SELECT ac.idSeccion
                FROM asignarclase ac
                WHERE ac.idClase = ? AND ac.idPeriodo = ?
            )
        `;
        const [results] = await conexion.query(selectQuery, [idClase, idPeriodo]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar las secciones:', error);
        res.status(500).json({ error: 'Error al consultar las secciones' });
    }
};

export const postAsignarClase = async (req, res) => {
    try {
        const { idPeriodo, idClase, idSeccion } = req.body;
        const insertQuery = `
            INSERT INTO asignarclase (idPeriodo, idClase, idSeccion)
            VALUES (?, ?, ?)
        `;
        await conexion.query(insertQuery, [idPeriodo, idClase, idSeccion]);
        res.status(201).json({ message: 'Clase asignada exitosamente' });
    } catch (error) {
        console.error('Error al asignar la clase:', error);
        res.status(500).json({ error: 'Error al asignar la clase' });
    }
};
export const getAulas = async (req, res) => {
    try {
        const {idDia, horaInicio, horaFin, idPeriodo} = req.query;
        const selectQuery = `
        SELECT a.idAula, a.nomAula 
        FROM aula a
        WHERE a.idAula NOT IN (
            SELECT rc.idAula 
            FROM relauladiaclase rc 
            WHERE rc.idDia = ? 
            AND (
                (rc.horaInicio <= ? AND rc.horaFin > ?) 
                OR (rc.horaInicio < ? AND rc.horaFin >= ?) 
                OR (rc.horaInicio >= ? AND rc.horaFin <= ?)
            ) 
            AND rc.idPeriodo = ?
        )
    `;
        const [results] = await conexion.query(selectQuery, [idDia, horaInicio, horaInicio, horaFin, horaFin, horaInicio, horaFin, idPeriodo]);
        res.status(200).json(results);
    }
    catch (error) {
        console.error('Error al consultar las aulas:', error);
        res.status(500).json({ error: 'Error al consultar las aulas' });
    }
};