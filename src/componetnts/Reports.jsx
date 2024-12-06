import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";

const PdfReport = () => {
  const [fecha, setFecha] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reporteData, setReporteData] = useState([]);
  const [tipoEntidad, setTipoEntidad] = useState("empleados");
  const [tipoReporte, setTipoReporte] = useState("general");
  const [tipoReporteAlumnos, setTipoReporteAlumnos] = useState("asistencia");
  const [tipoReporteEmpleados, setTipoReporteEmpleados] = useState("asistencia");
  const [rangoTiempo, setRangoTiempo] = useState("diario");
  const [numeroIdentidad, setNumeroIdentidad] = useState("");
  const [errorIdentidad, setErrorIdentidad] = useState("");

  useEffect(() => {
    const fetchReporte = async () => {
      let url = `http://localhost:3001/reporte-${tipoEntidad}?tipo=${tipoReporte}&rango=${rangoTiempo}`;

      if (tipoReporte === "individual" && numeroIdentidad.length === 13 && /^\d+$/.test(numeroIdentidad)) {
        url += `&numeroIdentidad=${numeroIdentidad}`;
      } else if (tipoReporte === "individual" && (!/^\d+$/.test(numeroIdentidad) || numeroIdentidad.length !== 13)) {
        setErrorIdentidad("El número de identidad debe tener 13 dígitos numéricos.");
        return;
      }

      if (rangoTiempo === "diario" && fecha) {
        url += `&fecha=${fecha}`;
      } else if ((rangoTiempo === "semanal" || rangoTiempo === "mensual") && fechaInicio && fechaFin) {
        url += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      if (tipoEntidad === "empleados" && tipoReporteEmpleados === "clases") {
        url += `&reporte=clases`;
      }

      if (tipoEntidad === "alumnos") {
        url += `&reporte=${tipoReporteAlumnos}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setReporteData(data);
      } catch (error) {
        console.error("Error al obtener datos del reporte:", error);
      }
    };

    fetchReporte();
  }, [
    fecha,
    fechaInicio,
    fechaFin,
    tipoEntidad,
    tipoReporte,
    rangoTiempo,
    numeroIdentidad,
    tipoReporteEmpleados,
    tipoReporteAlumnos,
  ]);

  const handleIdentidadChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 13) {
      setNumeroIdentidad(value);
      setErrorIdentidad("");
    } else {
      setErrorIdentidad("El número de identidad debe tener 13 dígitos numéricos.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const today = new Date();
    const fechaGeneracion = today.toLocaleDateString();

    const titulo = tipoEntidad === "empleados"
      ? `Reporte de ${tipoReporteEmpleados.charAt(0).toUpperCase() + tipoReporteEmpleados.slice(1)} (${rangoTiempo})`
      : `Reporte de Alumnos (${tipoReporteAlumnos.charAt(0).toUpperCase() + tipoReporteAlumnos.slice(1)})`;

    doc.setFontSize(18);
    doc.text(titulo, 14, 20);

    doc.setFontSize(12);
    doc.text(`Fecha de generación del reporte: ${fechaGeneracion}`, 14, 30);

    const tableColumn = tipoEntidad === "empleados" && tipoReporteEmpleados === "clases"
      ? ["Clase", "Carrera", "Sección", "Día", "Hora Inicio", "Hora Fin"]
      : tipoEntidad === "alumnos" && tipoReporteAlumnos === "notas"
      ? ["Asignatura", "Nota"]
      : tipoEntidad === "alumnos" && tipoReporteAlumnos === "tareas"
      ? ["Tarea", "Descripción", "Fecha de Entrega", "Estado"]
      : ["Fecha", "Nombre", "Apellido", "Hora Entrada", "Hora Salida"];

    const tableRows = reporteData.map((item) => {
      if (tipoEntidad === "empleados" && tipoReporteEmpleados === "clases") {
        return [item.nomClase, item.nomCarrera, item.nomSeccion, item.dia, item.horaInicio, item.horaFin];
      } else if (tipoEntidad === "alumnos" && tipoReporteAlumnos === "notas") {
        return [item.asignatura, item.nota];
      } else if (tipoEntidad === "alumnos" && tipoReporteAlumnos === "tareas") {
        return [item.tarea, item.descripcion, item.fechaEntrega, item.estado];
      } else {
        return [item.fecha, item.nombre, item.apellido, item.horaEntrada, item.horaSalida];
      }
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    const fileName = tipoEntidad === "empleados"
      ? `Reporte_${tipoReporteEmpleados}_${tipoReporte}_${rangoTiempo}.pdf`
      : `Reporte_Alumnos_${tipoReporteAlumnos}_${tipoReporte}_${rangoTiempo}.pdf`;

    doc.save(fileName);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3 }}>
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Configuración de Reporte
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tipo de Entidad</InputLabel>
          <Select
            value={tipoEntidad}
            onChange={(e) => setTipoEntidad(e.target.value)}
            label="Tipo de Entidad"
          >
            <MenuItem value="empleados">Empleados</MenuItem>
            <MenuItem value="alumnos">Alumnos</MenuItem>
          </Select>
        </FormControl>

        {tipoEntidad === "empleados" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Reporte de Empleados</InputLabel>
            <Select
              value={tipoReporteEmpleados}
              onChange={(e) => setTipoReporteEmpleados(e.target.value)}
              label="Tipo de Reporte de Empleados"
            >
              <MenuItem value="asistencia">Asistencia</MenuItem>
              <MenuItem value="clases">Clases que Imparte</MenuItem>
            </Select>
          </FormControl>
        )}

        {tipoEntidad === "alumnos" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Reporte de Alumnos</InputLabel>
            <Select
              value={tipoReporteAlumnos}
              onChange={(e) => setTipoReporteAlumnos(e.target.value)}
              label="Tipo de Reporte de Alumnos"
            >
              <MenuItem value="asistencia">Asistencia</MenuItem>
              <MenuItem value="notas">Notas</MenuItem>
              <MenuItem value="tareas">Tareas</MenuItem>
            </Select>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tipo de Reporte</InputLabel>
          <Select
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
            label="Tipo de Reporte"
          >
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
          </Select>
        </FormControl>

        {tipoReporte === "individual" && (
          <TextField
            fullWidth
            label="Número de Identidad"
            value={numeroIdentidad}
            onChange={handleIdentidadChange}
            error={Boolean(errorIdentidad)}
            helperText={errorIdentidad}
            inputProps={{ maxLength: 13 }}
            sx={{ mb: 2 }}
          />
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Rango de Tiempo</InputLabel>
          <Select
            value={rangoTiempo}
            onChange={(e) => setRangoTiempo(e.target.value)}
            label="Rango de Tiempo"
          >
            <MenuItem value="diario">Diario</MenuItem>
            <MenuItem value="semanal">Semanal</MenuItem>
            <MenuItem value="mensual">Mensual</MenuItem>
          </Select>
        </FormControl>

        {rangoTiempo === "diario" && (
          <TextField
            fullWidth
            type="date"
            label="Fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        )}

        {(rangoTiempo === "semanal" || rangoTiempo === "mensual") && (
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Inicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              type="date"
              label="Fecha de Fin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={generatePDF}
          disabled={
            (rangoTiempo === "diario" && !fecha) ||
            ((rangoTiempo === "semanal" || rangoTiempo === "mensual") && (!fechaInicio || !fechaFin)) ||
            (tipoReporte === "individual" && (numeroIdentidad.length !== 13 || Boolean(errorIdentidad)))
          }
          sx={{ mt: 2 }}
        >
          Descargar PDF
        </Button>
      </Paper>
    </Container>
  );
};

export default PdfReport;