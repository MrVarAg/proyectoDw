// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  TextField,
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

const EmpleadoForm = () => {
  const [numCuenta, setnumCuenta] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [idCargo, setIdCargo] = useState('');
  const [cargos, setCargos] = useState([]);
  const [activo, setActivo] = useState('A');
  const [errors, setErrors] = useState({});
  const [contrasena, setContrasena] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/cargos')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener cargos');
        return response.json();
      })
      .then((data) => setCargos(data))
      .catch((error) => console.error('Error al cargar los cargos:', error));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(numCuenta)) {
      newErrors.numCuenta = 'El número de cuenta debe tener 10 dígitos numéricos.';
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(nombre)) {
      newErrors.nombre = 'El nombre debe tener máximo 30 caracteres y no puede incluir números.';
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(apellido)) {
      newErrors.apellido = 'El apellido debe tener máximo 30 caracteres y no puede incluir números.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      newErrors.correo = 'El correo debe tener un formato válido.';
    }
    if (!idCargo) {
      newErrors.idCargo = 'Debe seleccionar un cargo.';
    }
    if (!contrasena) {
      newErrors.contrasena = 'Debe llenar la contraseña.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:3001/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numCuenta,
          nombre,
          apellido,
          correo,
          idCargo,
          activo,
          contrasena,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Empleado insertado con éxito');
        setnumCuenta('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setIdCargo('');
        setActivo('A');
        setContrasena('');
        setErrors({});
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
          {/* Datos de Cuenta */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de Cuenta
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{ maxLength: 10 }}
                  label="Número de Cuenta"
                  variant="outlined"
                  fullWidth
                  value={numCuenta}
                  onChange={(e) => setnumCuenta(e.target.value)}
                  error={!!errors.numCuenta}
                  helperText={errors.numCuenta}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  variant="outlined"
                  fullWidth
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={!!errors.correo}
                  helperText={errors.correo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.idCargo}>
                  <InputLabel>Cargo</InputLabel>
                  <Select
                    value={idCargo}
                    onChange={(e) => setIdCargo(e.target.value)}
                  >
                    {cargos.length > 0 ? (
                      cargos.map((cargo) => (
                        <MenuItem key={cargo.idCargo} value={cargo.idCargo}>
                          {cargo.nomCargo}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">Cargando...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Datos de Inicio de Sesión */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de Inicio de Sesión
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Número de Cuenta (Auto-Llenado)"
                  variant="outlined"
                  fullWidth
                  value={numCuenta}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  error={!!errors.contrasena}
                  helperText={errors.contrasena}
                />
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
              Insertar Empleado
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EmpleadoForm;
