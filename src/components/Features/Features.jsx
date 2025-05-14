import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faPersonWalking,
    faHouseLaptop,
    faDumbbell,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

import './Features.css';

const featuresData = [
    {
        id: 1,
        title: 'Resolución y Visión Nocturna',
        icon: faEye,
        description:
        'Las cámaras Ezviz ofrecen alta resolución (Full HD y 4K) y visión nocturna avanzada para garantizar imágenes claras incluso en la oscuridad total.',
        borderClass: 'borderTopBlue',
    },
    {
        id: 2,
        title: 'Detección de Movimiento y Seguimiento Inteligente',
        icon: faPersonWalking,
        description:
        'Incluyen detección inteligente de movimiento y seguimiento automático de personas o vehículos para mayor seguridad.',
        borderClass: 'borderBottomGreen',
    },
    {
        id: 3,
        title: 'Acceso Remoto y Notificaciones en Tiempo Real',
        icon: faHouseLaptop,
        description:
        'Permite monitoreo remoto en tiempo real mediante app móvil, con alertas instantáneas ante cualquier actividad sospechosa.',
        borderClass: 'borderTopPurple',
    },
    {
        id: 4,
        title: 'Carcasa Metálica de Alta Resistencia',
        icon: faDumbbell,
        description:
        'Diseño robusto con carcasa metálica de aleación de aluminio, ideal para exteriores bajo condiciones climáticas adversas.',
        borderClass: 'borderBottomYellow',
    },
];

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(null);

    const openModal = (feature) => setActiveFeature(feature);
    const closeModal = () => setActiveFeature(null);

    return (
        <section className="features">
            <h2 className="featuresTitle">Detalles importantes</h2>
            <div className="featuresContainer">
                {featuresData.map((feature) => (
                <div key={feature.id} className={`featureCard ${feature.borderClass}`}>
                    <div className="iconBox">
                    <FontAwesomeIcon icon={feature.icon} className="featureIcon" />
                    </div>
                    <h3 className="featureTitle">{feature.title}</h3>
                    <button className="viewMoreButton" onClick={() => openModal(feature)}>
                    Ver más
                    </button>
                </div>
                ))}
            </div>

            {activeFeature && (
                <div className="modalOverlay" onClick={closeModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <button className="modalClose" onClick={closeModal}>
                        <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <h3 className="modalTitle">{activeFeature.title}</h3>
                        <p className="modalDescription">{activeFeature.description}</p>
                    </div>
                </div>
            )}
        </section>
    );
}
