// eslint-disable-next-line no-unused-vars
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ExampleTable = () => {
  // Datos para la tabla
  const rows = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", age: 28 },
    { id: 2, name: "Ana López", email: "ana.lopez@example.com", age: 34 },
    { id: 3, name: "Carlos Rivera", email: "carlos.rivera@example.com", age: 22 },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Cabecera de la tabla */}
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Edad</TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la tabla */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExampleTable;
