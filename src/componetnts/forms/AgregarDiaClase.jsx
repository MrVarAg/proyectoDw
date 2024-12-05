import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Divider,
  TextField,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgregarDiaClaseForm = () => {
  const [clasesAsignadas, setClasesAsignadas] = useState([]);
  const [dias, setDias] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [selectedClaseAsignada, setSelectedClaseAsignada] = useState('');
  const [selectedDia, setSelectedDia] = useState('');
  const [selectedAula, setSelectedAula] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/clasesAsignadas')
      .then((response) => response.json())
      .then((data) => {
        console.log('Clases Asignadas:', data);
        setClasesAsignadas(data);
      })
      .catch((error) => console.error('Error al cargar las clases asignadas:', error));

    fetch('http://localhost:3001/dias')
      .then((response) => response.json())
      .then((data) => {
        console.log('Días:', data);
        setDias(data);
      })
      .catch((error) => console.error('Error al cargar los días:', error));
  }, []);

  useEffect(() => {
    if (selectedDia && horaInicio && horaFin) {
      fetch(`http://localhost:3001/aulasDisponibles?dia=${selectedDia}&horaInicio=${horaInicio}&horaFin=${horaFin}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Aulas Disponibles:', data);
          setAulas(data);
        })
        .catch((error) => console.error('Error al cargar las aulas disponibles:', error));
    }
  }, [selectedDia, horaInicio, horaFin]);

  const validate = () => {
    const newErrors = {};
    if (!selectedClaseAsignada) newErrors.claseAsignada = 'Debe seleccionar una clase asignada.';
    if (!selectedDia) newErrors.dia = 'Debe seleccionar un día.';
    if (!horaInicio) newErrors.horaInicio = 'Debe ingresar la hora de inicio.';
    if (!horaFin) newErrors.horaFin = 'Debe ingresar la hora de fin.';
    if (!selectedAula) newErrors.aula = 'Debe seleccionar un aula.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Por favor, complete todos los campos requeridos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/agregarDiaClase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idAula: selectedAula,
          idClaseAsignada: selectedClaseAsignada,
          idDia: selectedDia,
          horaInicio,
          horaFin,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Día de clase agregado exitosamente!');
        setSelectedClaseAsignada('');
        setSelectedDia('');
        setHoraInicio('');
        setHoraFin('');
        setSelectedAula('');
        setErrors({});
      } else {
        toast.error('Error al agregar el día de clase.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor.');
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
          Agregar Día de Clase
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de la Clase
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.claseAsignada}>
                  <InputLabel>Clase Asignada</InputLabel>
                  <Select
                    value={selectedClaseAsignada}
                    onChange={(e) => setSelectedClaseAsignada(e.target.value)}
                  >
                    {clasesAsignadas.map((clase) => (
                      <MenuItem key={clase.idClaseAsignada} value={clase.idClaseAsignada}>
                        {`${clase.idClaseAsignada} - ${clase.numCuenta} - ${clase.nombre} ${clase.apellido}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.dia}>
                  <InputLabel>Día</InputLabel>
                  <Select
                    value={selectedDia}
                    onChange={(e) => setSelectedDia(e.target.value)}
                  >
                    {dias.map((dia) => (
                      <MenuItem key={dia.idDia} value={dia.idDia}>
                        {dia.nomDia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hora de Inicio"
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  error={!!errors.horaInicio}
                  helperText={errors.horaInicio}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hora de Fin"
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  error={!!errors.horaFin}
                  helperText={errors.horaFin}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.aula}>
                  <InputLabel>Aula</InputLabel>
                  <Select
                    value={selectedAula}
                    onChange={(e) => setSelectedAula(e.target.value)}
                  >
                    {aulas.map((aula) => (
                      <MenuItem key={aula.idAula} value={aula.idAula}>
                        {aula.nomAula}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
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
              Agregar Día de Clase
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AgregarDiaClaseForm;