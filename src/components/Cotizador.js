import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import PaymentForm from './PaymentForm';  // Asegúrate de importar tu componente PaymentForm

// Estilos para el modal
const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%', // Ajusta el ancho según sea necesario
  maxWidth: '700px', // Ajusta el ancho máximo según sea necesario
  maxHeight:'500px',
  bgcolor: '#1e1e1e',
  boxShadow: 24, // Ajusta el valor según el diseño deseado
  p: 0,
  borderRadius: 2,  // Para bordes redondeados
};

function Cotizador({ materiales,totalCotizacion }) {

  // const totalCotizacion = (materiales) => {
  //   return materiales.reduce((total, material) => total + material.calidadPrecio, 0);
  // }
  // const total = totalCotizacion(materiales);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="cotizador">
      <Typography variant="h6" className="titulo">
        Cotizador
      </Typography>
      <Divider sx={{ marginBottom: 2 }} /> {/* Espacio debajo del título */}

      <div className="material-list">
        <List>
          {materiales.map((material) => (
            <ListItem key={material.id} >
              <ListItemText
                primary={
                  <span>
                    {material.nombre} {material.calidadNombre} {material.calidadPrecio}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
      <div className="cotizador-total-container">
        <h3 className="cotizador_total">Total: $ {totalCotizacion}</h3>
        <button
          className="cotizador_button"
          onClick={handleOpen}
        >
          Comprar
        </button>
        <Modal 
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
           <PaymentForm 
     
            labelTotal = {totalCotizacion}
            materiales = {materiales}
            handleClose={handleClose} />
 
        </Modal>
      </div>
    </div>
  );
}

export default Cotizador;
