import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PdfReport = ({ title, date, data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Información adicional del reporte (fecha)
    doc.setFontSize(12);
    doc.text(`Fecha: ${date}`, 14, 30);

    // Espacio antes de la tabla
    doc.text(" ", 14, 40);

    // Agregar encabezados de la tabla (adaptados a los datos que recibimos)
    const tableColumn = ["ID", "Nombre", "Cantidad", "Precio"];
    const tableRows = [];

    // Insertar datos en cada fila de la tabla usando los datos que pasamos como props
    data.forEach(item => {
      const itemData = [
        item.id.toString(),
        item.name,
        item.quantity.toString(),
        `$${item.price}`,
      ];
      tableRows.push(itemData);
    });

    // Añadir la tabla al PDF usando el formato de jsPDF con autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    // Generar el archivo PDF y descargarlo
    doc.save(`${title}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF}>Descargar PDF</button>
    </div>
  );
};

export default PdfReport;
