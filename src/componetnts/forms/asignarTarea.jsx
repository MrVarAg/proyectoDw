import React, { useState } from 'react';
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

const AgregarTareaForm = () => {
  const [nombreTarea, setNombreTarea] = useState('');
  const [valor, setValor] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [selectedClase, setSelectedClase] = useState('');

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
          Agregar Tarea
        </Typography>
        <form style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de la Tarea
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre de la Tarea"
                  variant="outlined"
                  fullWidth
                  value={nombreTarea}
                  onChange={(e) => setNombreTarea(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Valor"
                  variant="outlined"
                  fullWidth
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Entrega"
                  variant="outlined"
                  fullWidth
                  value={fechaEntrega}
                  onChange={(e) => setFechaEntrega(e.target.value)}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Clase Asignada</InputLabel>
                  <Select
                    value={selectedClase}
                    onChange={(e) => setSelectedClase(e.target.value)}
                  >
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button
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
              Agregar Tarea
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AgregarTareaForm;
