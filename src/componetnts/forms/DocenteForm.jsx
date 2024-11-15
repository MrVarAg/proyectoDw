import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';

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
                console.log("Departamentos obtenidos:", data);
                setDepartamentos(data);
            })
            .catch((error) => {
                console.error("Error al cargar los departamentos:", error);
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
        <Container sx={{ maxWidth: 'md', marginTop: 5 }}>
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom color="primary">
                    Insertar Empleado
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        {/* Fila 1: DNI Empleado y Nombre */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="DNI Empleado"
                                variant="outlined"
                                fullWidth
                                value={dniempleado}
                                onChange={(e) => setDniEmpleado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>

                        {/* Fila 2: Apellido y Teléfono */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </Grid>

                        {/* Fila 3: Correo y Departamento */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Correo"
                                variant="outlined"
                                fullWidth
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
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
                                        <MenuItem value="">Cargando...</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Fila 4: Estado */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <MenuItem value="A">Activo</MenuItem>
                                    <MenuItem value="I">Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Botón pequeño centrado */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                padding: '8px 16px',
                                fontSize: '14px',
                                borderRadius: '30px',
                                boxShadow: 2,
                                '&:hover': {
                                    backgroundColor: '#1976d2',
                                },
                            }}
                        >
                            Insertar Empleado
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EmpleadoForm;
