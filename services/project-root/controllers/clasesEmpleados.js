import conexion from "../models/conexion.js";

export const getClasesEmpleados = async (req, res) => {
  const { tipo, numeroIdentidad } = req.query;

  try {
    let query = `
            SELECT
            ac.idClaseAsignada, ac.idPeriodo, ac.idClase, ac.numCuenta, ac.idSeccion
            from asignarclase ac
        `;

    let params = [];
    if (tipo === "individual" && numeroIdentidad) {
      query += ` WHERE e.numeroIdentidad = ?`;
      params.push(numeroIdentidad);
    }

    const [results] = await conexion.query(query, params);
    res.status(200).json(results);
  } catch (error) {
    console.error(
      "Error al consultar las clases impartidas por empleados:",
      error
    );
    res.status(500).json({
      error: "Error al consultar las clases impartidas por empleados",
    });
  }
};
