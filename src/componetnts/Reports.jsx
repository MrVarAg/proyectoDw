// eslint-disable-next-line no-unused-vars
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
} from "@mui/material";

const PdfReport = () => {
  const [fecha, setFecha] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reporteData, setReporteData] = useState([]);
  const [tipoReporte, setTipoReporte] = useState("general");
  const [rangoTiempo, setRangoTiempo] = useState("diario");

  useEffect(() => {
    const fetchReporte = async () => {
      let url = `http://localhost:3001/reporte-asistencia?tipo=${tipoReporte}&rango=${rangoTiempo}`;

      if (rangoTiempo === "diario" && fecha) {
        url += `&fecha=${fecha}`;
      } else if ((rangoTiempo === "semanal" || rangoTiempo === "mensual") && fechaInicio && fechaFin) {
        url += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      if ((rangoTiempo === "diario" && fecha) || ((rangoTiempo === "semanal" || rangoTiempo === "mensual") && fechaInicio && fechaFin)) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log("Datos recibidos:", data);
          setReporteData(data);
        } catch (error) {
          console.error("Error al obtener datos del reporte:", error);
        }
      }
    };
    
    fetchReporte();
  }, [fecha, fechaInicio, fechaFin, tipoReporte, rangoTiempo]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const today = new Date();
    const fechaGeneracion = today.toLocaleDateString();

    const titulo = `Reporte de Asistencia (${rangoTiempo.charAt(0).toUpperCase() + rangoTiempo.slice(1)})`;
    doc.setFontSize(18);
    doc.text(titulo, 14, 20);

    // Fecha de generación del reporte
    doc.setFontSize(12);
    doc.text(`Fecha de generación del reporte: ${fechaGeneracion}`, 14, 30);

    const tableColumn = ["Fecha de Asistencia", "Nombre", "Apellido", "Hora de Entrada", "Hora de Salida"];
    const tableRows = reporteData.map((item) => [
      item.fechaAsistencia,
      item.nombreEmpleado,
      item.apellidoEmpleado,
      item.horaEntrada,
      item.horaDeSalida,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    const fileName = rangoTiempo === "diario" 
      ? `Reporte_${tipoReporte}_${rangoTiempo}_${fecha}.pdf` 
      : `Reporte_${tipoReporte}_${rangoTiempo}_${fechaInicio}_a_${fechaFin}.pdf`;
    
    doc.save(fileName);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Generador de Reporte de Asistencia
      </Typography>
      
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Tipo de Reporte</InputLabel>
        <Select value={tipoReporte} onChange={(e) => setTipoReporte(e.target.value)} label="Tipo de Reporte">
          <MenuItem value="general">General</MenuItem>
          <MenuItem value="individual">Individual</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Rango de Tiempo</InputLabel>
        <Select value={rangoTiempo} onChange={(e) => setRangoTiempo(e.target.value)} label="Rango de Tiempo">
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
          sx={{ mt: 2 }}
        />
      )}

      {(rangoTiempo === "semanal" || rangoTiempo === "mensual") && (
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
          ((rangoTiempo === "semanal" || rangoTiempo === "mensual") && (!fechaInicio || !fechaFin))
        }
        sx={{ mt: 3 }}
      >
        Descargar PDF
      </Button>
    </Container>
  );
};

export default PdfReport;
