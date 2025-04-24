import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        const yOffset = -100; // Ajusta este valor según el tamaño del margen deseado
        const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
};

export default ScrollToHash;