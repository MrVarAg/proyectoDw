import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PdfReport = () => {
  const [fecha, setFecha] = useState("");
  const [reporteData, setReporteData] = useState([]);

  useEffect(() => {
    if (fecha) {
      const fetchReporte = async () => {
        try {
          const response = await fetch(`http://localhost:3001/reporte-asistencia?fecha=${fecha}`);
          const data = await response.json();
          console.log("Datos recibidos:", data);  // Agrega este console.log
          setReporteData(data);
        } catch (error) {
          console.error("Error al obtener datos del reporte:", error);
        }
      };
      
      fetchReporte();
    }
  }, [fecha]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de Asistencia", 14, 20);

    const tableColumn = ["Nombre", "Apellido", "Hora de Entrada", "Hora de Salida"];
    const tableRows = reporteData.map((item) => [
      item.nombreEmpleado,
      item.apellidoEmpleado,
      item.horaEntrada,
      item.horaDeSalida,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Reporte_Asistencia_${fecha}.pdf`);
  };

  return (
    <div>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        placeholder="Selecciona una fecha"
      />
      <button onClick={generatePDF} disabled={!fecha}>
        Descargar PDF
      </button>
    </div>
  );
};

export default PdfReport;
