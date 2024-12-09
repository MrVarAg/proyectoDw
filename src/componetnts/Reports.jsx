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

  const mostrarFiltrosTiempo =
    (tipoEntidad === "empleados" && tipoReporteEmpleados === "asistencia" && (tipoReporte === "general" || tipoReporte === "individual")) ||
    (tipoEntidad === "alumnos" && tipoReporteAlumnos === "asistencia" && (tipoReporte === "general" || tipoReporte === "individual"));

  useEffect(() => {
    const fetchReporte = async () => {
      let url = `http://localhost:3001/reporte-${tipoEntidad}?tipo=${tipoReporte}`;

      if (mostrarFiltrosTiempo) {
        url += `&rango=${rangoTiempo}`;
        if (rangoTiempo === "diario" && fecha) {
          url += `&fecha=${fecha}`;
        } else if ((rangoTiempo === "semanal" || rangoTiempo === "mensual") && fechaInicio && fechaFin) {
          url += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        }
      }

      if (tipoReporte === "individual" && numeroIdentidad.length === 10 && /^\d+$/.test(numeroIdentidad)) {
        url += `&numeroIdentidad=${numeroIdentidad}`;
      } else if (tipoReporte === "individual" && (!/^\d+$/.test(numeroIdentidad) || numeroIdentidad.length !== 10)) {
        setErrorIdentidad("El número de cuenta debe tener 10 dígitos numéricos.");
        return;
      }

      if (tipoEntidad === "empleados" && tipoReporteEmpleados === "clases") {
        url += `&reporte=clases`;
      } else if (tipoEntidad === "alumnos") {
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
    mostrarFiltrosTiempo,
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
      ? `Reporte de ${tipoReporteEmpleados.charAt(0).toUpperCase() + tipoReporteEmpleados.slice(1)}`
      : `Reporte de Alumnos (${tipoReporteAlumnos.charAt(0).toUpperCase() + tipoReporteAlumnos.slice(1)})`;

    doc.setFontSize(18);
    doc.text(titulo, 14, 20);

    doc.setFontSize(12);
    doc.text(`Fecha de generación del reporte: ${fechaGeneracion}`, 14, 30);

    let tableColumn = [];
    let tableRows = [];

    if (tipoEntidad === "empleados" && tipoReporteEmpleados === "asistencia") {
      tableColumn = ["Fecha de Asistencia", "Nombre", "Apellido", "Hora de Entrada", "Hora de Salida"];
      tableRows = reporteData.map((item) => [
        item.fechaAsistencia,
        item.nombre,
        item.apellido,
        item.horaEntrada,
        item.horaSalida,
      ]);
    } else if (tipoEntidad === "empleados" && tipoReporteEmpleados === "clases") {
      tableColumn = ["Nombre de Clase", "ID Clase", "Nombre Docente"];
      tableRows = reporteData.map((item) => [
        item.nombreClase,
        item.idClase,
        item.nombreDocente,
      ]);
    } else if (tipoEntidad === "alumnos" && tipoReporteAlumnos === "asistencia") {
      tableColumn = ["Fecha de Asistencia", "Nombre", "Apellido", "Hora de Entrada", "Hora de Salida"];
      tableRows = reporteData.map((item) => [
        item.fechaAsistencia,
        item.nombre,
        item.apellido,
        item.horaEntrada,
        item.horaSalida,
      ]);
    } else if (tipoEntidad === "alumnos" && tipoReporteAlumnos === "tareas") {
      tableColumn = ["ID Tarea", "Nombre Tarea", "Valor", "Fecha de Entrega", "ID Clase Asignada"];
      tableRows = reporteData.map((item) => [
        item.idTarea,
        item.nombreTarea,
        item.valor,
        item.fechaEntrega,
        item.idClaseAsignada,
      ]);
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    const fileName = tipoEntidad === "empleados"
      ? `Reporte_${tipoReporteEmpleados}_${tipoReporte}.pdf`
      : `Reporte_Alumnos_${tipoReporteAlumnos}_${tipoReporte}.pdf`;

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
            label="Número de Cuenta"
            value={numeroIdentidad}
            onChange={handleIdentidadChange}
            error={Boolean(errorIdentidad)}
            helperText={errorIdentidad}
            sx={{ mb: 2 }}
          />
        )}

        {mostrarFiltrosTiempo && (
          <>
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
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={generatePDF}
          disabled={
            (mostrarFiltrosTiempo && rangoTiempo === "diario" && !fecha) ||
            (mostrarFiltrosTiempo && (rangoTiempo === "semanal" || rangoTiempo === "mensual") && (!fechaInicio || !fechaFin)) ||
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
