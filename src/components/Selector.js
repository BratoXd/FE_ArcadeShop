import React from 'react';
import { Typography, List, ListItem, ListItemText, Checkbox, Divider } from '@mui/material';

function SelectorDeMateriales({ materiales, onMaterialChange }) {
  const handleChange = (event, material) => {
    const isChecked = event.target.checked;
    onMaterialChange(material, isChecked);
  };

  return (
    <div className="selector-de-materiales">
  
        <Typography variant="h6"  className="titulo">
          Selector de Materiales
        </Typography>
        <Divider sx={{ marginBottom: 2 }} /> {/* Espacio debajo del título */}
 
 
        <List>
          {materiales.map((material) => (
            <ListItem key={material.id} >
              <ListItemText
                primary={
                  <span>
                    {material.nombre}                     
                  </span>
                }
              />
              <Checkbox
                edge="start"
                onChange={(event) => handleChange(event, material)}
                sx={{ marginRight: 2 }}
              />
            </ListItem>
          ))}
        </List>
     
    </div>
  );
}

export default SelectorDeMateriales;
