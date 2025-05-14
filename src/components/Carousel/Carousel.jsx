import { useRef } from 'react';
import './Carousel.css';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const images = [
    foto1, foto2, foto3, foto4, foto5,
    foto6, foto7, foto8, foto9, foto10,
];

export default function Carousel() {
    const carouselRef = useRef(null);

    const scrollCarousel = (direction) => {
        const scrollAmount = window.innerWidth / 2;
        carouselRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    };

    return (
        <>
            <h2>ALGUNAS MUESTRAS</h2>
            <section className="carousel">
                

                <button className="carousel-btn left" onClick={() => scrollCarousel('left')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="carousel-container" ref={carouselRef}>
                    {images.map((img, idx) => (
                    <div className="element" key={idx}>
                        <img src={img} alt={`Imagen de cámaras ${idx + 1}`} />
                    </div>
                    ))}
                </div>

                <button className="carousel-btn right" onClick={() => scrollCarousel('right')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </section>
        </>
        
    );
}
