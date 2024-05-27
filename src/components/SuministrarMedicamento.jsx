import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const SuministrarMedicamento = ({ medicamento, onVolver }) => {
  const [codigo, setCodigo] = useState('');

  const handleSuministrar = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/send', { message: codigo });
      console.log('Mensaje enviado:', response.data);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Suministrar {medicamento.name}
      </Typography>
      <TextField
        label="Código"
        variant="outlined"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSuministrar}>
        Suministrar
      </Button>
      <Button variant="contained" color="secondary" onClick={onVolver} sx={{ ml: 2 }}>
        Volver
      </Button>
    </Box>
  );
};

export default SuministrarMedicamento;
