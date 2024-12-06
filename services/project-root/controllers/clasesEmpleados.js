import conexion from "../models/conexion.js";

export const getClasesEmpleados = async (req, res) => {
    const { tipo, numeroIdentidad } = req.query;

    try {
        let query = `
            SELECT c.nomClase, car.nomCarrera, s.nomSeccion, rdc.idDia, rdc.horaInicio, rdc.horaFin
            FROM clase c
            INNER JOIN carrera car ON c.idCarrera = car.idCarrera
            INNER JOIN relauladiaclase rdc ON c.idClase = rdc.idClaseAsignada
            INNER JOIN empleado e ON c.idEmpleado = e.idEmpleado
        `;

        let params = [];
        if (tipo === "individual" && numeroIdentidad) {
            query += ` WHERE e.numeroIdentidad = ?`;
            params.push(numeroIdentidad);
        }

        const [results] = await conexion.query(query, params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al consultar las clases impartidas por empleados:", error);
        res.status(500).json({ error: "Error al consultar las clases impartidas por empleados" });
    }
};