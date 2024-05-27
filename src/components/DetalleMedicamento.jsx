import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const DetalleMedicamento = ({ medicamento, onVolver }) => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {medicamento.name}
      </Typography>
      <img src={medicamento.imageUrl} alt={medicamento.name} style={{ maxHeight: '200px' }} />
      <Typography variant="body1" gutterBottom>
        Tipo: {medicamento.type}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Contenido: {medicamento.content}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Laboratorio: {medicamento.laboratory}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Precio: ${medicamento.price}
      </Typography>
      <Button variant="contained" color="primary" onClick={onVolver}>
        Volver
      </Button>
    </Box>
  );
};

export default DetalleMedicamento;
