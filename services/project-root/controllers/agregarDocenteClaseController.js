import conexion from "../models/conexion.js";
export const updateNumCuenta = async (req, res) => {
  const { idUsuario, numCuenta } = req.body;
  try {
    const updateQuery = `
            UPDATE asignarclase
            SET numCuenta = ?
            WHERE idClaseAsignada = ?
        `;
    await conexion.query(updateQuery, [numCuenta, idUsuario]);
    res
      .status(200)
      .json({ message: "Número de cuenta actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el número de cuenta:", error);
    res.status(500).json({ error: "Error al actualizar el número de cuenta" });
  }
};
export const getDocentes = async (req, res) => {
    const { idClaseAsignada, idPeriodo } = req.query;
  
    try {
      const selectQuery = `
      SELECT 
          e.numCuenta, p.nombre
      FROM 
          empleado e
      INNER JOIN 
          persona p 
          ON p.numCuenta = e.numCuenta
      WHERE 
          e.numCuenta NOT IN (
              SELECT 
                  ac.numCuenta
              FROM 
                  asignarclase ac
              WHERE 
                  ac.idClase = ? AND ac.idPeriodo = ?
          )
      ORDER BY 
          p.nombre ASC;
      `;
      const [results] = await conexion.query(selectQuery, [
        idClaseAsignada,
        idPeriodo,
      ]);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error al consultar los docentes:", error);
      res.status(500).json({ error: "Error al consultar los docentes" });
    }
  };
  
export const getClaseCreada = async (req, res) => {
    try {
        const selectQuery = `
        SELECT
        ac.idClaseAsignada, ac.idPeriodo, p.nomPeriodo, ac.idClase, cl.nomClase, cr.nomCarrera, ac.idSeccion, sc.nomSeccion
        FROM asignarclase ac
        LEFT JOIN clase cl on cl.idClase = ac.idClase
        LEFT JOIN carrera cr on cr.idCarrera = cl.idCarrera
        LEFT JOIN seccion sc on sc.idSeccion = ac.idSeccion
        LEFT JOIN periodo p on p.idPeriodo = ac.idPeriodo
        WHERE ac.numCuenta IS NULL OR NOT EXISTS (
            SELECT 1 
            FROM asignarclase rdc
            WHERE rdc.numCuenta = ac.numCuenta
        )
        ORDER BY ac.idClaseAsignada DESC
        `;
        const [results] = await conexion.query(selectQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al consultar la clase creada:', error);
        res.status(500).json({ error: 'Error al consultar la clase creada' });
    }
};

