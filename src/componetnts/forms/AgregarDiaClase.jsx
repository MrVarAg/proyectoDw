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
  const [horarios, setHorarios] = useState([{ idDia: '', horaInicio: '', horaFin: '', idAula: '' }]);
  
const handeleHorarioChange = (index, field, value) => {
    const newHorarios = [...horarios];
    newHorarios[index][field] = value;
    setHorarios(newHorarios);
};
const addDiaHorario = () => {
    setHorarios([...horarios, { dia: '', horaInicio: '', horaFin: '', aula: '' }]);
};


  useEffect(() => {
    fetch('http://localhost:3001/api/clase-creada')
      .then((response) => response.json())
      .then((data) => {
        console.log('Clases Asignadas:', data);
        setClasesAsignadas(data);
      })
      .catch((error) => console.error('Error al cargar las clases asignadas:', error));

    fetch('http://localhost:3001/api/dias')
      .then((response) => response.json())
      .then((data) => {
        console.log('Días:', data);
        setDias(data);
      })
      .catch((error) => console.error('Error al cargar los días:', error));
  }, []);

  useEffect(() => {
    if (selectedDia && horaInicio && horaFin) {
      fetch(`http://localhost:3001/api/aulas?iddia=${selectedDia}&horaInicio=${horaInicio}&horaFin=${horaFin}`)
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
    const horariosInvalidos = horarios.some(h => !h.idDia || !h.horaInicio || !h.horaFin || !h.idAula);
    if(horariosInvalidos) {
      toast.error('Por favor, complete todos los campos de horarios');
      return;
    }
    try {
const diaClaseData = { idDia: selectedDia, horaInicio, horaFin, idAula: selectedAula, idClaseAsignada: selectedClaseAsignada };
      const response = await fetch('http://localhost:3001/api/agregar-dia-clase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diaClaseData),
      });
      if (response.ok) {
        toast.success('Día de clase agregado exitosamente');
        setSelectedClaseAsignada('');
        setSelectedDia('');
        setHoraInicio('');
        setHoraFin('');
        setSelectedAula('');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error('Error al agregar el día de clase');
      }
    }
    catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al intentar agregar el día de clase');
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
                        {`${clase.idClaseAsignada} - ${clase.nomClase} - ${clase.nomCarrera} - ${clase.nomSeccion} - ${clase.nomPeriodo}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body2" color="textprimary" align="center">
              Datos de horario
            </Typography>
            {horarios.map((horario, index) => (
              <Grid container spacing={2} key={index} sx={{ marginTop: 2 }}>
                <Grid item xs={4}>
                  <FormControl fullWidth error={!!errors.dia}>
                    <InputLabel>Día</InputLabel>
                    <Select
                      value={horario.idDia}
                      onChange={(e) => handeleHorarioChange(index, 'idDia', e.target.value)}
                    >
                      {dias.map((dia) => (
                        <MenuItem key={dia.idDia} value={dia.idDia}>
                          {dia.nomDia}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Hora de Inicio"
                    type="time"
                    fullWidth
                    value={horario.horaInicio}
                    onChange={(e) => handeleHorarioChange(index, 'horaInicio', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Hora de Fin"
                    type="time"
                    fullWidth
                    value={horario.horaFin}
                    onChange={(e) => handeleHorarioChange(index, 'horaFin', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth error={!!errors.aula}>
                    <InputLabel>Aula</InputLabel>
                    <Select
                      value={horario.idAula}
                      onChange={(e) => handeleHorarioChange(index, 'idAula', e.target.value)}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={addDiaHorario}
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
                Agregar Horario
              </Button>
          </Box>
        </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AgregarDiaClaseForm;