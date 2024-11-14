    // eslint-disable-next-line no-unused-vars
    import React, { useState, useEffect } from 'react';
    import {
        TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, Grid
    } from '@mui/material';

    const ClaseForm = () => {
        const [nomAula, setNomAula] = useState([]);
        const [idAula, setIdAula] = useState('');
        const [nomClase, setNomClase] = useState("");
        const [idSeccion, setIdSeccion] = useState("");
        const [nomSeccion, setNomSecciones] = useState([]);
        // eslint-disable-next-line no-unused-vars
        const [dias, setDias] = useState([
            { id: 1, nombre: 'Lunes' },
            { id: 2, nombre: 'Martes' },
            { id: 3, nombre: 'Miércoles' },
            { id: 4, nombre: 'Jueves' },
            { id: 5, nombre: 'Viernes' }
        ]);
        const [horarios, setHorarios] = useState([{ dia: '', horaInicio: '', horaFin: '' }]);
        const [dniEmpleado, setDniEmpleado] = useState('');
        const [empleado, setEmpleado] = useState([]);
        
        useEffect(() => {
            // Cargar aulas, secciones y empleados desde la base de datos
            fetch("http://localhost:3001/aulas")
                .then(response => response.json())
                .then(data => setNomAula(data));
            fetch("http://localhost:3001/secciones")
                .then(response => response.json())
                .then(data => setNomSecciones(data));
            fetch("http://localhost:3001/empleados")
                .then(response => response.json())
                .then(data => setEmpleado(data));
        }, []);

        const handleHorarioChange = (index, field, value) => {
            const newHorarios = [...horarios];
            newHorarios[index][field] = value;
            setHorarios(newHorarios);
        };

        const addDiaHorario = () => {
            setHorarios([...horarios, { dia: '', horaInicio: '', horaFin: '' }]);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const claseData = {
                    nomClase,
                    idAula,
                    idSeccion,
                    horarios,
                    dniEmpleado
                };

                const response = await fetch('http://localhost:3001/clases', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(claseData),
                });

                if (response.ok) {
                    alert('Clase insertada con éxito');
                    setNomClase('');
                    setIdAula('');
                    setIdSeccion('');
                    setHorarios([{ dia: '', horaInicio: '', horaFin: '' }]);
                    setDniEmpleado('');
                } else {
                    alert('Error al insertar la clase');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al intentar insertar la clase');
            }
        };

        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Insertar Clase
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de la Clase"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nomClase}
                        onChange={(e) => setNomClase(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Aula</InputLabel>
                        <Select
                            value={idAula}
                            onChange={(e) => setIdAula(e.target.value)}
                        >
                            {nomAula.map((aula) => (
                                <MenuItem key={aula.idAula} value={aula.idAula}>
                                    {aula.nomAula}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Sección</InputLabel>
                        <Select
                            value={idSeccion}
                            onChange={(e) => setIdSeccion(e.target.value)}
                        >
                            {nomSeccion.map((seccion) => (
                                <MenuItem key={seccion.idSeccion} value={seccion.idSeccion}>
                                    {seccion.nomSeccion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <Typography variant="h6" gutterBottom>
                        Horarios de Clase
                    </Typography>
                    {horarios.map((horario, index) => (
                        <Grid container spacing={2} key={index} marginBottom={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Día</InputLabel>
                                    <Select
                                        value={horario.dia}
                                        onChange={(e) => handleHorarioChange(index, 'dia', e.target.value)}
                                    >
                                        {dias.map((dia) => (
                                            <MenuItem key={dia.id} value={dia.id}>{dia.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Hora Inicio"
                                    type="time"
                                    fullWidth
                                    value={horario.horaInicio}
                                    onChange={(e) => handleHorarioChange(index, 'horaInicio', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Hora Fin"
                                    type="time"
                                    fullWidth
                                    value={horario.horaFin}
                                    onChange={(e) => handleHorarioChange(index, 'horaFin', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Button onClick={addDiaHorario} variant="outlined" style={{ marginBottom: '10px' }}>
                        Agregar Día
                    </Button>

                    <FormControl fullWidth margin="normal">
                    <InputLabel>Docente</InputLabel>
                    <Select
                        value={dniEmpleado}
                        onChange={(e) => setDniEmpleado(e.target.value)}
                    >
                        {empleado.length > 0 ? (
                            empleado.map((emp) => (
                                <MenuItem key={emp.dniempleado} value={emp.dniempleado}>
                                    {emp.dniempleado} {emp.nombre} {emp.apellido}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">Cargando...</MenuItem>
                        )}
                    </Select>
                </FormControl>

                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                        Insertar Clase
                    </Button>
                </form>
            </Container>
        );
    };

    export default ClaseForm;
