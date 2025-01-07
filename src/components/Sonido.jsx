import { useEffect, useState } from 'react';

const Sonido = () => {
  const [audio] = useState(new Audio('/assets/sonido.mp3')); // Asegúrate de que el archivo está en la carpeta public
  useEffect(() => {
    const handleClick = (e) => {
      // Reproducir solo si el botón izquierdo del ratón (button: 0) es presionado
      if (e.button === 0) {
        audio.loop = true; // Reproducir en bucle
        audio.play(); // Comienza la reproducción
      }
    };

    // Escuchar el evento de clic en el documento
    document.addEventListener('click', handleClick);

    // Limpiar al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClick);
      audio.pause(); // Detener la música cuando el componente se desmonta
    };
  }, [audio]);

  return null; // No es necesario renderizar nada en este caso
};

export default Sonido;
