import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

const CardMedicamento = ({ imageUrl, name, price, type, content, laboratory, onVerDetalle, onSuministrar }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contenido: {content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Laboratorio: {laboratory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onVerDetalle}>Ver detalles</Button>
        <Button size="small" onClick={onSuministrar}>Suministrar</Button>
      </CardActions>
    </Card>
  );
};

export default CardMedicamento;
