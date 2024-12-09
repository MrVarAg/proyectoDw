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
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AsignarClaseAlumnoForm = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [clases, setClases] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [selectedClaseAsignada, setSelectedClaseAsignada] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/alumnos')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAlumnos(data);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((error) => console.error('Error al cargar los alumnos:', error));

    fetch('http://localhost:3001/api/clases')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setClases(data);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((error) => console.error('Error al cargar las clases:', error));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!selectedAlumno) newErrors.alumno = 'Debe seleccionar un alumno.';
    if (!selectedClaseAsignada) newErrors.claseAsignada = 'Debe seleccionar una clase asignada.';
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
      const response = await fetch('http://localhost:3001/api/asignar-clase-alumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numCuenta: selectedAlumno,
          idClaseAsignada: selectedClaseAsignada,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Clase asignada exitosamente!');
        setSelectedAlumno('');
        setSelectedClaseAsignada('');
        setErrors({});
      } else {
        toast.error('Error al asignar la clase.');
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
          Asignar Clase a Alumno
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de Asignación de Clase
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.alumno}>
                  <InputLabel>Alumno</InputLabel>
                  <Select
                    value={selectedAlumno}
                    onChange={(e) => setSelectedAlumno(e.target.value)}
                  >
                    {alumnos.map((alumno) => (
                      <MenuItem key={alumno.numCuenta} value={alumno.numCuenta}>
                        {`${alumno.numCuenta} - ${alumno.nombre}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.claseAsignada}>
                  <InputLabel>Clase Asignada</InputLabel>
                  <Select
                    value={selectedClaseAsignada}
                    onChange={(e) => setSelectedClaseAsignada(e.target.value)}
                  >
                    {clases.map((clase) => (
                      <MenuItem key={clase.idClase} value={clase.idClase}>
                        {`${clase.idClase} - ${clase.nomClase} - ${clase.nomCarrera}`}
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
              Asignar Clase
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AsignarClaseAlumnoForm;
