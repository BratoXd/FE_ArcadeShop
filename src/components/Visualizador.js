import React from 'react';
import { List, ListItem, ListItemButton,Divider,Typography ,styled  } from '@mui/material';
 


const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  border: '1px solid #ddd', // Borde alrededor del botón
  borderRadius: '8px', // Bordes redondeados
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra ligera
  transition: 'background-color 0.3s ease', // Transición suave para hover
  margin: '10px 0', // Separación entre los botones
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo más oscuro en hover
  },
}));


function Visualizador({ materiales, calidadMat, onQualityChange }) {

  const handleClick = (event, calidades) => {
    onQualityChange(calidades);
  };

  return (
    <div className="visualizador">
        <Typography variant="h6"  className="titulo">
          Selector de Calidades
        </Typography>
        <Divider sx={{ marginBottom: 2 }} /> {/* Espacio debajo del título */}
 
      <List>
        {calidadMat
          .filter((calidades) => materiales.some((material) => material.id === calidades.idMaterial))
          .map((calidades) => (
            <div>
              <ListItem key={calidades.id}>
                <CustomListItemButton
                  id={calidades.id}
                  onClick={(event) => handleClick(event, calidades)}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>

                    <img
                      src={calidades.imagen}
                      alt={calidades.nombre}
                      style={{ width: 100, height: 'auto', marginRight: 10 }}
                    />
                    <div>
                      <div>{calidades.nombre}</div>
                      <div>{calidades.precio} MXN</div>
                    </div>

                  </div>
                </CustomListItemButton>
              </ListItem>

            </div>
          ))}
      </List>
    </div>
  );
}

export default Visualizador;
