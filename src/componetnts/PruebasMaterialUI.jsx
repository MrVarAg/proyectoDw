// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
    Container, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const ClaseForm = () => {
    const [nomAula, setNomAula] = useState([]);
    const [idAula, setIdAula] = useState('');
    const [dniEmpleado, setDniEmpleado] = useState('');
    const [empleado, setEmpleado] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/empleados")
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener empleados");
                return response.json();
            })
            .then((data) => {
                console.log("Empleados obtenidos:", data);
                setEmpleado(data);
            })
            .catch((error) => {
                console.error("Error al cargar los empleados:", error);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/aulas")
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener aulas");
                return response.json();
            })
            .then((data) => {
                console.log("Aulas obtenidas:", data);
                setNomAula(data);
            })
            .catch((error) => {
                console.error("Error al cargar las aulas:", error);
            });
    }, []);

    return (
        <Container>
            <form>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Docente</InputLabel>
                    <Select
                        value={dniEmpleado}
                        onChange={(e) => setDniEmpleado(e.target.value)}
                    >
                        {empleado.length > 0 ? (
                            empleado.map((emp) => (
                                <MenuItem key={emp.dniempleado} value={emp.dniempleado}>
                                    {emp.nombre} {emp.apellido}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">Cargando...</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Aulas</InputLabel>
                    <Select
                        value={idAula}
                        onChange={(e) => setIdAula(e.target.value)}
                    >
                        {nomAula.length > 0 ? (
                            nomAula.map((aul) => (
                                <MenuItem key={aul.idAula} value={aul.idAula}>
                                    {aul.nomAula}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">Cargando...</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </form>
        </Container>
    );
};

export default ClaseForm;
