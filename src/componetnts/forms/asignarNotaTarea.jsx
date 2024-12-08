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

const AsignarNotaTareaForm = () => {
  const [numCuenta, setNumCuenta] = useState('');
  const [selectedTarea, setSelectedTarea] = useState('');
  const [nota, setNota] = useState('');
  const [observacion, setObservacion] = useState('');

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
          Asignar Nota a Tarea
        </Typography>
        <form style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de Asignación de Nota
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Número de Cuenta"
                  variant="outlined"
                  fullWidth
                  value={numCuenta}
                  onChange={(e) => setNumCuenta(e.target.value)}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tarea</InputLabel>
                  <Select
                    value={selectedTarea}
                    onChange={(e) => setSelectedTarea(e.target.value)}
                  >
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nota"
                  variant="outlined"
                  fullWidth
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  type="number"
                  inputProps={{ min: 0, max: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Observación"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                />
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
              Asignar Nota
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AsignarNotaTareaForm;
