import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const Bienvenida = ({ onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          ¡Bienvenido a SumiBot!
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Use este módulo para gestionar sus medicamentos de manera eficiente.
        </Typography>
        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default Bienvenida;
