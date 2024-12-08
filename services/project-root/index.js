import express from "express";
import cors from "cors";
import asignarClaseRoutes from "./routes/asignarClaseRoutes.js";
import agregarDiaClaseRoutes from "./routes/agregarDiaClaseRoutes.js";
import agregarSeccionRoutes from "./routes/agregarSeccionRoutes.js";
import agregarDocenteClaseRoutes from "./routes/agregarDocenteClaseRoutes.js";
import agregarCarreraRoutes from "./routes/agregarCarreraRoutes.js";
import agregarAlumnoRoutes from "./routes/agregarAlumnoRoutes.js";
import agregarAulaRoutes from "./routes/agregarAulaRoutes.js";
import agregarDocenteRoutes from "./routes/agregarDocenteRoutes.js";
//import asistenciaAlumnosRoutes from "./routes/asistenciaAlumnosRoutes.js";
//import asistenciaEmpleadosRoutes from "./routes/asistenciaEmpleadosRoutes.js";
//import clasesEmpleadosRoutes from "./routes/clasesEmpleadosRoutes.js";
//import notasTareasAlumnosRoutes from "./routes/notasTareasAlumnosRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", asignarClaseRoutes);
app.use("/api", agregarDiaClaseRoutes);
app.use("/api", agregarSeccionRoutes);
app.use("/api", agregarDocenteClaseRoutes);
app.use("/api", agregarCarreraRoutes);
app.use("/api", agregarAlumnoRoutes);
app.use("/api", agregarAulaRoutes);
app.use("/api", agregarDocenteRoutes);

//app.use("/api", asistenciaAlumnosRoutes);
//app.use("/api", asistenciaEmpleadosRoutes);
//app.use("/api", clasesEmpleadosRoutes);
//app.use("/api", notasTareasAlumnosRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
