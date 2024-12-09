import conexion from "../models/conexion.js";

export const getTareasAlumnos = async (req, res) => {
    const { tipo, numCuenta, fechaInicio, fechaFin } = req.query;

    try {
        let query = `
            SELECT t.idTarea, t.nomTarea, t.valor, t.fechaEntrega, t.idClaseAsignada, p.nombre, p.apellido
            FROM tarea t
            INNER JOIN reltareaalumno rta ON t.idTarea = rta.idTarea
            INNER JOIN alumno al ON rta.numCuenta = al.numCuenta
            INNER JOIN persona p ON al.numCuenta = p.numCuenta
        `;

        let params = [];
        if (tipo === "individual" && numCuenta) {
            query += ` WHERE al.numCuenta = ?`;
            params.push(numCuenta);
        } else if (fechaInicio && fechaFin) {
            query += ` WHERE t.fechaEntrega BETWEEN ? AND ?`;
            params.push(fechaInicio, fechaFin);
        }

        const [results] = await conexion.query(query, params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al consultar las tareas de alumnos:", error);
        res.status(500).json({ error: "Error al consultar las tareas de alumnos" });
    }
};
