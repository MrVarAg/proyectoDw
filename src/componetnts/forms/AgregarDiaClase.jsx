// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const AgregarDiaClaseForm = () => {
  const [clasesAsignadas, setClasesAsignadas] = useState([]);
  const [dias, setDias] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [selectedClaseAsignada, setSelectedClaseAsignada] = useState('');
  const [horarios, setHorarios] = useState([{ idDia: '', horaInicio: null, horaFin: null, idAula: '' }]);
  const [errors, setErrors] = useState({});

  const fetchClasesAsignadas = () => {
    fetch('http://localhost:3001/api/clase-creada')
      .then((response) => response.json())
      .then(setClasesAsignadas)
      .catch((error) => console.error('Error al cargar las clases asignadas:', error));
  };

  const fetchDias = () => {
    fetch('http://localhost:3001/api/dias')
      .then((response) => response.json())
      .then(setDias)
      .catch((error) => console.error('Error al cargar los días:', error));
  };

  const fetchAulas = (idDia, horaInicio, horaFin) => {
    fetch(`http://localhost:3001/api/aulas?iddia=${idDia}&horaInicio=${horaInicio}&horaFin=${horaFin}`)
      .then((response) => response.json())
      .then(setAulas)
      .catch((error) => console.error('Error al cargar las aulas disponibles:', error));
  };

  useEffect(() => {
    fetchClasesAsignadas();
    fetchDias();
  }, []);

  useEffect(() => {
    const lastHorario = horarios[horarios.length - 1];
    if (lastHorario.idDia && lastHorario.horaInicio && lastHorario.horaFin) {
      fetchAulas(lastHorario.idDia, lastHorario.horaInicio.format('HH:mm'), lastHorario.horaFin.format('HH:mm'));
    }
  }, [horarios]);

  const handleHorarioChange = (index, field, value) => {
    const updatedHorarios = [...horarios];
    updatedHorarios[index][field] = value;
    setHorarios(updatedHorarios);
  };

  const addDiaHorario = () => {
    setHorarios([...horarios, { idDia: '', horaInicio: null, horaFin: null, idAula: '' }]);
  };

  const validate = () => {
    const newErrors = {};
    for (const horario of horarios) {
      if (!horario.idDia || !horario.horaInicio || !horario.horaFin || !horario.idAula) {
        newErrors.horarios = 'Por favor, complete todos los campos de horarios.';
      }
    }
    if (!selectedClaseAsignada) {
      newErrors.claseAsignada = 'Debe seleccionar una clase asignada.';
    }
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
      const response = await fetch('http://localhost:3001/api/agregar-dia-clase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedClaseAsignada,
          horarios: horarios.map(horario => ({
            ...horario,
            horaInicio: horario.horaInicio.format('HH:mm'),
            horaFin: horario.horaFin.format('HH:mm')
          }))
        }),
      });

      if (response.ok) {
        toast.success('Día(s) de clase agregado(s) exitosamente');
        setSelectedClaseAsignada('');
        setHorarios([{ idDia: '', horaInicio: null, horaFin: null, idAula: '' }]);
        fetchClasesAsignadas();
        fetchDias();
        setErrors({});
      } else {
        toast.error('Error al agregar el día de clase.');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      toast.error('Hubo un error en el servidor.');
    }
  };

  const getDiasDisponibles = (index) => {
    const selectedDias = horarios.map((horario) => horario.idDia);
    return dias.filter((dia) => !selectedDias.includes(dia.idDia) || dia.idDia === horarios[index].idDia);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          marginTop: 5,
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
              Datos del Día de Clase
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.claseAsignada}>
                  <InputLabel>Clase Asignada</InputLabel>
                  <Select
                    value={selectedClaseAsignada}
                    onChange={(e) => setSelectedClaseAsignada(e.target.value)}
                  >
                    {clasesAsignadas.map((clase) => (
                      <MenuItem key={clase.idClaseAsignada} value={clase.idClaseAsignada}>
                        {`${clase.nomClase} - ${clase.nomCarrera} - ${clase.nomSeccion} - ${clase.nomPeriodo}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Horarios
            </Typography>
            <Divider />
            {horarios.map((horario, index) => (
              <Grid container spacing={2} key={index} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth error={!!errors.horarios}>
                    <InputLabel>Día</InputLabel>
                    <Select
                      value={horario.idDia}
                      onChange={(e) => handleHorarioChange(index, 'idDia', e.target.value)}
                    >
                      {getDiasDisponibles(index).map((dia) => (
                        <MenuItem key={dia.idDia} value={dia.idDia}>
                          {dia.nomDia}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Hora Inicio"
                      value={horario.horaInicio}
                      onChange={(newValue) => handleHorarioChange(index, 'horaInicio', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth error={!!errors.horarios} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Hora Fin"
                      value={horario.horaFin}
                      onChange={(newValue) => handleHorarioChange(index, 'horaFin', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth error={!!errors.horarios} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth error={!!errors.horarios}>
                    <InputLabel>Aula</InputLabel>
                    <Select
                      value={horario.idAula}
                      onChange={(e) => handleHorarioChange(index, 'idAula', e.target.value)}
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
            ))}
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Button onClick={addDiaHorario} variant="outlined" fullWidth>
              Agregar Día
            </Button>
          </Box>

          <Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AgregarDiaClaseForm;