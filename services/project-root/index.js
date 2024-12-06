import express from "express";
import cors from "cors";
import asignarClaseRoutes from "./routes/asignarClaseRoutes.js";
import agregarSeccionRoutes from "./routes/agregarSeccionRoutes.js";
import asistenciaAlumnosRoutes from "./routes/asistenciaAlumnosRoutes.js";
import asistenciaEmpleadosRoutes from "./routes/asistenciaEmpleadosRoutes.js";
import clasesEmpleadosRoutes from "./routes/clasesEmpleadosRoutes.js";
import notasTareasAlumnosRoutes from "./routes/notasTareasAlumnosRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", asignarClaseRoutes);
app.use("/api", agregarSeccionRoutes);
app.use("/api", asistenciaAlumnosRoutes);
app.use("/api", asistenciaEmpleadosRoutes);
app.use("/api", clasesEmpleadosRoutes);
app.use("/api", notasTareasAlumnosRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
