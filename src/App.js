import React, { useState } from 'react';
import Visualizador from './components/Visualizador';
import SelectorDeMateriales from './components/Selector';
import Cotizador from './components/Cotizador';
import './App.css';
import { List, ListItem, ListItemButton, Divider } from '@mui/material';
import ModelViewer from './components/ModelViewer'; // Ajusta la ruta según tu estructura de carpetas
const materiales = [
  { id: 1, nombre: 'No Jugadores' },
  { id: 2, nombre: 'Diseño Madera' },
  { id: 3, nombre: 'Diseño Impresion Digital' },
  { id: 4, nombre: 'Tipo Herraje' },
  { id: 5, nombre: 'Material Especial' },
  { id: 6, nombre: 'Tipo Palanca' },
  { id: 7, nombre: 'Controlador' },
  { id: 8, nombre: 'TouchMappingSystem' },
  { id: 9, nombre: 'CubreCanto' },
  { id: 10, nombre: 'Leds' },
  { id: 11, nombre: 'PantallaLCD' },
  { id: 12, nombre: 'kitInalambrico' },
  { id: 13, nombre: 'Bocinas' },
  // Otros materiales
];


const calidadMaterial = [
  {
    id: 1,
    idMaterial: 1,
    precio: 150,
    nombre: 'Solitario Gamer',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_785995-MLM51315264480_082022-O.webp',
    modelo3D: 'SolitarioGamer.glb'
  },
  {
    id: 2,
    idMaterial: 1,
    precio: 250,
    nombre: 'Dual Player',
    imagen: 'https://sounds.mx/media/catalog/product/c/a/cab02.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560',
    modelo3D: 'DualPlayer.glb'
  },
  {
    id: 3,
    idMaterial: 1,
    precio: 450,
    nombre: '4 Players',
    imagen: 'https://www.gamexshop.com.mx/cdn/shop/files/rn-image_picker_lib_temp_b0d5be94-77e6-4ac5-ba28-233a64a62fb8.jpg?v=1701389015&width=1445',
    modelo3D: '4Player.glb'
  },
  {
    id: 4,
    idMaterial: 2,
    precio: 50,
    nombre: 'Cuadrado Nes',
    imagen: 'https://www.pexels.com/photo/black-and-white-nes-console-1817642/',
    modelo3D: 'SolitarioGamer.glb'
  },
  {
    id: 5,
    idMaterial: 2,
    precio: 100,
    nombre: 'Fancy Mexican',
    imagen: 'https://www.pexels.com/photo/colorful-arcade-machine-3810780/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 6,
    idMaterial: 2,
    precio: 80,
    nombre: 'Border 1',
    imagen: 'https://www.pexels.com/photo/retro-arcade-game-1051236/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 7,
    idMaterial: 3,
    precio: 100,
    nombre: 'HD',
    imagen: 'https://www.pexels.com/photo/modern-gaming-monitor-3840x2160-5342/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 8,
    idMaterial: 3,
    precio: 150,
    nombre: '4K',
    imagen: 'https://www.pexels.com/photo/modern-gaming-monitor-3840x2160-5342/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 9,
    idMaterial: 3,
    precio: 130,
    nombre: 'Luminicente',
    imagen: 'https://www.pexels.com/photo/colorful-gaming-monitor-2928143/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 10,
    idMaterial: 4,
    precio: 70,
    nombre: 'Acople',
    imagen: 'https://www.herralum.com/assets/images/project/products/136100500/136100500.png',
    modelo3D: 'Herraje1.glb'
  },
  {
    id: 11,
    idMaterial: 4,
    precio: 90,
    nombre: 'Iman',
    imagen: '/models/img_iman.png',
    modelo3D: 'Iman.glb'
  },
  {
    id: 12,
    idMaterial: 5,
    precio: 200,
    nombre: 'Madera',
    imagen: 'https://www.pexels.com/photo/wooden-arcade-cabinet-4068529/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 13,
    idMaterial: 5,
    precio: 180,
    nombre: 'Plastico',
    imagen: 'https://www.pexels.com/photo/plastic-arcade-machine-2064590/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 14,
    idMaterial: 6,
    precio: 60,
    nombre: 'Sencilla',
    imagen: 'https://www.pexels.com/photo/simple-arcade-game-1624321/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 15,
    idMaterial: 6,
    precio: 120,
    nombre: 'Leds',
    imagen: 'https://www.pexels.com/photo/arcade-machine-leds-2213650/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 16,
    idMaterial: 7,
    precio: 70,
    nombre: 'BN_Original',
    imagen: 'https://www.pexels.com/photo/retro-arcade-console-1282827/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 17,
    idMaterial: 7,
    precio: 50,
    nombre: 'Chino',
    imagen: 'https://www.pexels.com/photo/cheap-arcade-machine-1817641/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 18,
    idMaterial: 7,
    precio: 55,
    nombre: 'ChinoCable',
    imagen: 'https://www.pexels.com/photo/chinese-arcade-cable-3468007/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 19,
    idMaterial: 7,
    precio: 75,
    nombre: 'BN_OriginalCable',
    imagen: 'https://www.pexels.com/photo/arcade-machine-cable-1231232/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 20,
    idMaterial: 7,
    precio: 150,
    nombre: 'SuperCPU',
    imagen: 'https://www.pexels.com/photo/super-cpu-arcade-3094851/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 21,
    idMaterial: 8,
    precio: 200,
    nombre: '14"',
    imagen: 'https://www.pexels.com/photo/14-inch-monitor-3940259/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 22,
    idMaterial: 8,
    precio: 100,
    nombre: '8"',
    imagen: 'https://www.pexels.com/photo/8-inch-monitor-3940260/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 23,
    idMaterial: 9,
    precio: 20,
    nombre: 'Plastico',
    imagen: 'https://www.pexels.com/photo/plastic-arcade-covers-3578130/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 24,
    idMaterial: 9,
    precio: 35,
    nombre: 'Metalico',
    imagen: 'https://www.pexels.com/photo/metal-arcade-covers-2392042/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 25,
    idMaterial: 10,
    precio: 15,
    nombre: 'Leds',
    imagen: 'https://www.pexels.com/photo/leds-on-arcade-machine-4158325/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 26,
    idMaterial: 10,
    precio: 20,
    nombre: 'Neon',
    imagen: 'https://www.pexels.com/photo/neon-arcade-light-3914845/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 27,
    idMaterial: 11,
    precio: 200,
    nombre: 'Rosa',
    imagen: 'https://www.pexels.com/photo/pink-arcade-light-3491280/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 28,
    idMaterial: 11,
    precio: 100,
    nombre: 'Azul',
    imagen: 'https://www.pexels.com/photo/blue-arcade-light-2233445/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 29,
    idMaterial: 12,
    precio: 10,
    nombre: 'Normal',
    imagen: 'https://www.pexels.com/photo/arcade-wiring-3445342/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  },
  {
    id: 30,
    idMaterial: 12,
    precio: 15,
    nombre: 'Color',
    imagen: 'https://www.pexels.com/photo/colorful-arcade-wiring-1231230/',
    modelo3D: 'https://www.3dwarehouse.sketchup.com/model/3d-viewer'
  }
];






function App() {


  

  const [materialesSeleccionados, setMaterialesSeleccionados] = useState([]);

  const handleMaterialChange = (material, isChecked) => {
    if (isChecked) {
      setMaterialesSeleccionados([
        ...materialesSeleccionados,
        { ...material, calidadNombre: '', calidadPrecio: 0, calidadId: null },
      ]);
    } else {
      setMaterialesSeleccionados(materialesSeleccionados.filter(m => m.id !== material.id));
    }
  };


  const handleQualityChange = (quality) => {
    // Usar el setter con una función para asegurarse de usar el estado más reciente
    setMaterialesSeleccionados((materialesSeleccionados) => {
      // Verificar si la calidad ya está en el arreglo
      const isQualitySelected = materialesSeleccionados.some(
        (m) => m.id === quality.idMaterial && m.calidadId === quality.id
      );

      if (isQualitySelected) {
        // Si ya está seleccionado, lo eliminamos
        return materialesSeleccionados
      } else {
 
        // Si no está seleccionado, lo agregamos con los datos necesarios
        return materialesSeleccionados.map((m) =>
          m.id === quality.idMaterial
            ? { ...m,
               calidadNombre: quality.nombre,
               calidadPrecio: quality.precio,
               calidadId: quality.id,
               modelo3D: quality.modelo3D
              }
            : m
        );
      }
    });
  };


  const ultimoMaterialSeleccionado = materialesSeleccionados.slice(-1)[0];

  
  const totalCotizacion = (materiales) => {
    return materiales.reduce((total, material) => total + material.calidadPrecio, 0);
  }
  const total = totalCotizacion(materialesSeleccionados);




  return (
 

    <div class="parent">
    <div class="div1">        <SelectorDeMateriales
      materiales={materiales}
      onMaterialChange={handleMaterialChange}
    />
    </div>
    <div class="div2">
      <Visualizador
        materiales={ultimoMaterialSeleccionado ? [ultimoMaterialSeleccionado] : []}
        calidadMat={calidadMaterial}
        onQualityChange={handleQualityChange}
      />
    </div>
    <div class="div3">
      <ModelViewer modelUrl={
        `/models/${ultimoMaterialSeleccionado ? ultimoMaterialSeleccionado.modelo3D : ''
        }`} />
    </div>
    <div class="div4">
      <Cotizador
        materiales={materialesSeleccionados}
        totalCotizacion = {total}
      />
    </div>
  </div>


  );
}

export default App;
