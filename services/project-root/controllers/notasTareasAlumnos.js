import conexion from "../models/conexion.js";

export const getNotasTareasAlumnos = async (req, res) => {
    const { tipo, numCuenta } = req.query;

    try {
        let query = `
            SELECT ta.nomTarea, ta.valor, ta.fechaEntrega, rta.nota, rta.observacion, al.numCuenta
            FROM tarea ta
            INNER JOIN reltareaalumno rta ON ta.idTarea = rta.idTarea
            INNER JOIN alumno al ON rta.numCuenta = al.numCuenta
        `;

        let params = [];
        if (tipo === "individual" && numCuenta) {
            query += ` WHERE al.numCuenta = ?`;
            params.push(numCuenta);
        }

        const [results] = await conexion.query(query, params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al consultar las notas y tareas de alumnos:", error);
        res.status(500).json({ error: "Error al consultar las notas y tareas de alumnos" });
    }
};