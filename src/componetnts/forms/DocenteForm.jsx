import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const EmpleadoForm = () => {
    const [dniempleado, setDniEmpleado] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [iddepartamento, setIdDepartamento] = useState('');
    const [estado, setEstado] = useState('A'); // Predeterminado a "Activo"
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/departamentos")
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener departamentos");
                return response.json();
            })
            .then((data) => {
                console.log("Departamentos:", data); // Asegúrate de que los datos se imprimen en la consola
                setDepartamentos(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/empleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dniempleado, nombre, apellido, telefono, correo, iddepartamento, estado }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Empleado insertado con éxito');
                // Reiniciar los campos del formulario
                setDniEmpleado('');
                setNombre('');
                setApellido('');
                setTelefono('');
                setCorreo('');
                setIdDepartamento('');
                setEstado('A');
            } else {
                alert(`Error al insertar empleado: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar insertar el empleado');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Insertar Empleado
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="DNI Empleado"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={dniempleado}
                    onChange={(e) => setDniEmpleado(e.target.value)}
                />
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <TextField
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <TextField
                    label="Correo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                <InputLabel>Departamento</InputLabel>
                <Select
                     value={iddepartamento}
                    onChange={(e) => setIdDepartamento(e.target.value)}
                >
                    {departamentos.length > 0 ? (
                        departamentos.map((dep) => (
                            <MenuItem key={dep.iddepartamento} value={dep.iddepartamento}>
                                {dep.departamento}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="">Cargando...</MenuItem> // Esto muestra un mensaje mientras se cargan los departamentos
                    )}
                </Select>
            </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Estado</InputLabel>
                    <Select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <MenuItem value="A">Activo</MenuItem>
                        <MenuItem value="I">Inactivo</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                    Insertar Empleado
                </Button>
            </form>
        </Container>
    );
};

export default EmpleadoForm;
