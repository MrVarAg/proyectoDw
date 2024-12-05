import conexion from "../models/conexion.js";

export const getAsistenciaEmpleados = async (req, res) => {
    const { tipo, numeroIdentidad, fechaInicio, fechaFin } = req.query;

    try {
        let query = `
            SELECT e.nombre, e.apellido, a.fecha, a.horaEntrada, a.horaSalida
            FROM asistencia a
            INNER JOIN empleado e ON a.idEmpleado = e.idEmpleado
        `;

        let params = [];
        if (tipo === "individual" && numeroIdentidad) {
            query += ` WHERE e.numeroIdentidad = ?`;
            params.push(numeroIdentidad);
        } else if (fechaInicio && fechaFin) {
            query += ` WHERE a.fecha BETWEEN ? AND ?`;
            params.push(fechaInicio, fechaFin);
        }

        const [results] = await conexion.query(query, params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al consultar la asistencia de empleados:", error);
        res.status(500).json({ error: "Error al consultar la asistencia de empleados" });
    }
};