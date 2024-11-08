import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PdfReport = ({ nombre, horaentrada, horasalida, diainicio, diafin }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de Horario", 14, 20);

    const tableColumn = ["Nombre", "Hora de Entrada", "Hora de Salida", "Día de Inicio", "Día de Fin"];
    const tableRows = [
      [nombre, horaentrada, horasalida, diainicio, diafin]
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Reporte_Horario_${nombre}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF}>Descargar PDF</button>
    </div>
  );
};

export default PdfReport;
