import foto1 from '../../assets/images/carousel/1.png';
import foto2 from '../../assets/images/carousel/2.png';
import foto3 from '../../assets/images/carousel/3.png';
import foto4 from '../../assets/images/carousel/4.png';
import foto5 from '../../assets/images/carousel/5.png';
import foto6 from '../../assets/images/carousel/6.png';
import foto7 from '../../assets/images/carousel/7.png';
import foto8 from '../../assets/images/carousel/8.png';
import foto9 from '../../assets/images/carousel/9.png';
import foto10 from '../../assets/images/carousel/10.png';
import './Carousel.css';

// export default function Carousel() {
//     return (
//         <>
//             <h2>ALGUNAS MUESTRAS</h2>
//             <section className="carousel">
//                 <div className="carousel-container">
                    
//                     <div className="element">
//                         <img src={foto2} alt="Imágen de la cámara " />
//                     </div>
//                     <div className="element">
//                         <img src={foto3} alt="Imágen de la cámara " />
//                     </div>
//                     <div className="element">
//                         <img src={foto4} alt="Imágen de la cámara " />
//                     </div>
//                     <div className="element">
//                         <img src={foto5} alt="Imágen de la cámara " />
//                     </div>
//                     <div className="element">
//                         <img src={foto6} alt="Imágen de la cámara " />
//                     </div>
//                     <div className="element">
//                         <img src={foto1} alt="Imágen de la cámara " />
//                     </div>
                    
                    
//                 </div>
//             </section>
//         </>
//     )
// }

export default function Carousel() {
    // Se declara carouselContainer como una variable para almacenar una referencia al contenedor del carrusel, que se asignará más adelante con ref.
    let carouselContainer = null;

    // Función para mover el scroll hacia la izquierda
    const moveLeft = () => {
        carouselContainer.scrollLeft -= window.innerWidth/2; // devuelve la mitad del ancho de la ventana del navegador, incluyendo barras de desplazamiento si están visibles.
    };

    // Función para mover el scroll hacia la derecha
    const moveRight = () => {
        
        carouselContainer.scrollLeft += window.innerWidth/2; // devuelve la mitad del ancho de la ventana del navegador, incluyendo barras de desplazamiento si están visibles.
        // if (carouselContainer.scrollLeft )
    };

    return (
        <>
            <h2>ALGUNAS MUESTRAS</h2>
            <section className="carousel">
                {/* Botón de mover a la izquierda */}
                <button className="carousel-btn left" onClick={moveLeft}>
                    ←
                </button>

                {/* Contenedor del carousel */}
                <div className="carousel-container" ref={(el) => (carouselContainer = el)}>
                    <div className="element">
                        <img src={foto1} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto2} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto3} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto4} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto5} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto6} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto7} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto8} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto9} alt="Imágen de cámaras " />
                    </div>
                    <div className="element">
                        <img src={foto10} alt="Imágen de cámaras " />
                    </div>
                </div>

                {/* Botón de mover a la derecha */}
                <button className="carousel-btn right" onClick={moveRight}>
                    →
                </button>
            </section>
        </>
    );
}