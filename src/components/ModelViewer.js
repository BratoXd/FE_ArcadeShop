import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = ({ modelUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Configuración básica de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Configurar el tamaño del renderer para que coincida con el contenedor
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Amortiguación para una rotación suave

    // Iluminación básica
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Cargar el modelo GLB/GLTF
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // Ajusta la escala según sea necesario
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLB:', error);
      }
    );

    // Posición inicial de la cámara
    camera.position.set(0, 1, 3);

    // Función de animación para renderizar la escena
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Actualiza los controles para la amortiguación
      renderer.render(scene, camera);
    };
    animate();

    // Manejar el redimensionamiento del contenedor
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el renderer y los controles al desmontar el componente
    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [modelUrl]);

  return <div ref={mountRef} className="model-viewer-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default ModelViewer;
