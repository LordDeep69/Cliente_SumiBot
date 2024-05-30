import React from 'react';
import { Grid, Box, TextField, Button } from '@mui/material';
import CardMedicamento from './CardMedicamento';

const medicamentos = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/WosmG5aKrxuUPRuBQhQPVzGWDWsuSTycwugGGIIzRurh5WIKDz1ip7qoamP3DNpBETs_sSnmv1E_k_IfLnvbY_19JLrD0GQ8kg=s360',
    name: 'Medicamento 1',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://colmed.com.co/WebColmedInternational/media/products/Tramadol-50mg-x-10.webp',
    name: 'Medicamento 2',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://cdn.pim.mesoigner.fr/mesoigner/ca09962b989bb7d213f25dd7c773d0af/mesoigner-thumbnail-1000-1000-inset/806/033/alprazolam-arrow-0-25-mg-comprime-secable.webp',
    name: 'Medicamento 3',
    price: 250.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 4',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/y0szA0Xw5LkQJ2wPUz7rZwlF-XURh2yGPC9NkuUlZj_2tVpkPnHOuRd0I29PucdWqaY35IytzzxtN9nT6iWroRpgO-MPC14o17dWJPZkh01DxBS6=s360',
    name: 'Medicamento 4',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/ApskHwkCxvPok3EvTjHYTqvzXAcm4dRoLoDTcVYQO_S6xqKeya1heTlTdOcsYktpKLDIzGcwZnsz-f7P0r9yh6RkKpUhDKgNtfMTk9uCIrt_DIb8=s360',
    name: 'Medicamento 5',
    price: 10.0,
    type: 'Tipo 1',
    content: 'Contenido 1',
    laboratory: 'Laboratorio 1',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/proxy/ibVQJ6qbAA4n6haQr0fMEn46w5Lvvn8i1-29f-DOHQRabv_NtN4K9sHhq07o1A7khWpU4801vkv6ZxzEGEGqcVkV-FWjMx9DwUFUEnYpI_L5HDmMMB7t',
    name: 'Medicamento 6',
    price: 250.0,
    type: 'Tipo 1',
    content: 'Contenido 80',
    laboratory: 'Laboratorio 4',
  }
  // Añade más objetos de medicamentos según sea necesario
];

const VistaMedicamentos = ({ onVerDetalle, onSuministrar, onRealizarPedido, searchTerm, setSearchTerm }) => {
  const filteredMedicamentos = medicamentos.filter((medicamento) =>
    medicamento.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={onRealizarPedido}>
          Realizar Pedido
        </Button>
      </Box>
      <Grid container spacing={2}>
        {filteredMedicamentos.map((medicamento, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CardMedicamento
              {...medicamento}
              onVerDetalle={() => onVerDetalle(medicamento)}
              onSuministrar={() => onSuministrar(medicamento)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VistaMedicamentos;
