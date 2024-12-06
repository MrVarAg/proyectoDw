import conexion from "../models/conexion.js";

export const getAulas = async (req, res) => {
    const { idDia, horaInicio, horaFin } = req.query;

    try {
        const selectQuery = 
           ` SELECT a.idAula, a.nomAula 
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
            )`
        ;
        const [results] = await conexion.query(selectQuery, [idDia, horaInicio, horaFin, horaFin, horaInicio, horaInicio, horaFin]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar las aulas:', error);
        res.status(500).json({ error: 'Error al consultar las aulas' });
    }
};
export const postAgregarDiaClase = async (req, res) => {
    try {
        const { selectedClaseAsignada, horarios } = req.body;

        // Verificar que los datos no sean nulos
        if (!selectedClaseAsignada || !horarios || !Array.isArray(horarios) || horarios.length === 0) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        // Insertar cada horario en la base de datos
        for (const horario of horarios) {
            const { idDia, horaInicio, horaFin, idAula } = horario;

            if (!idDia || !horaInicio || !horaFin || !idAula) {
                return res.status(400).json({ error: 'Datos de horario inválidos' });
            }

            const insertQuery = `
                INSERT INTO relauladiaclase (idDia, horaInicio, horaFin, idAula, idClaseAsignada)
                VALUES (?, ?, ?, ?, ?)
            `;
            await conexion.query(insertQuery, [idDia, horaInicio, horaFin, idAula, selectedClaseAsignada]);
        }

        res.status(201).json({ message: 'Día(s) de clase agregado(s) exitosamente' });
    } catch (error) {
        console.error('Error al agregar el día de clase:', error);
        res.status(500).json({ error: 'Error al agregar el día de clase' });
    }
};
export const getClaseCreada = async (req, res) => {
    try {
        const selectQuery = `
        SELECT
        ac.idClaseAsignada, ac.idPeriodo, p.nomPeriodo, ac.idClase, cl.nomClase, cr.nomCarrera, ac.idSeccion, sc.nomSeccion
        FROM asignarclase ac
        LEFT JOIN clase cl on cl.idClase = ac.idClase
        left join carrera cr on cr.idCarrera = cl.idCarrera
        left join seccion sc on sc.idSeccion = ac.idSeccion
        left join periodo p on p.idPeriodo = ac.idPeriodo
        where ac.idClaseAsignada not in(select idClaseAsignada from relauladiaclase)
        ORDER BY ac.idClaseAsignada DESC
        `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    }
    catch (error) {
        console.error('Error al consultar la clase creada:', error);
        res.status(500).json({ error: 'Error al consultar la clase creada' });
    }
};
export const getDias = async (req, res) => {
    try {
        const selectQuery = `
        SELECT d.idDia, d.nomDia 
        FROM dia d
    `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    }
    catch (error) {
        console.error('Error al consultar los días:', error);
        res.status(500).json({ error: 'Error al consultar los días' });
    }
}