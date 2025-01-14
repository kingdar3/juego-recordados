import { useEffect } from "react";
import { Board } from "./components/Board";
import Sonido from "./components/Sonido";

function App() {
  useEffect(() => {
    // Bloquear zoom con Ctrl + rueda del mouse
    const preventZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Bloquear zoom con atajos de teclado (Ctrl + "+" o Ctrl + "-")
    const preventKeyZoom = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=")
      ) {
        e.preventDefault();
      }
    };

    // Deshabilitar clic derecho
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    // Prevenir el zoom en dispositivos móviles (pellizco de los dedos)
    const preventMobileZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault(); // Evitar el zoom con dos dedos
      }
    };

    // Agregar eventos
    window.addEventListener("wheel", preventZoom, { passive: false });
    window.addEventListener("keydown", preventKeyZoom);
    window.addEventListener("contextmenu", disableRightClick);
    window.addEventListener("touchmove", preventMobileZoom, { passive: false });

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("wheel", preventZoom);
      window.removeEventListener("keydown", preventKeyZoom);
      window.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("touchmove", preventMobileZoom);
    };
  }, []);

  return (
    <>
      <Board />
      <Sonido></Sonido>
    </>
  );
}

export default App;
