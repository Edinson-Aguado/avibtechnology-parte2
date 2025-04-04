import './Features.css';

export default function Features() {
    return (
        <>
            <h2>Detalles de calidad</h2>
            <section className="section-feactures">
                <div className="feacture feacture-1">
                    <h3>
                        Resolución y Visión Nocturna
                    </h3>
                    <input type="checkbox" id="mostrar-mas-1" className="mostrar-mas" />
                    <label htmlFor="mostrar-mas-1" className="ver-mas">
                        <i className="fa-solid fa-mouse-pointer"></i>
                    </label>
                    
                    <div className="caja-icono">
                        <div className="icono">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                    </div>
                    
                    
                    <div className="description">
                    Las cámaras Ezviz ofrecen alta resolución (Full HD y 4K) y visión nocturna avanzada, ideales para supervisión en hogares y negocios. Capturan imágenes nítidas en cualquier iluminación, permitiendo identificar rostros y placas. Su tecnología infrarroja garantiza video claro incluso en total oscuridad, brindando seguridad continua y confianza en la vigilancia sin pérdida de información, sin importar la hora o el entorno.
                    </div>
                </div>
                <div className="feacture feacture-2">
                    <h3>Detección de Movimiento y Seguimiento Inteligente</h3>
                    <input type="checkbox" id="mostrar-mas-2" className="mostrar-mas" />
                    <label htmlFor="mostrar-mas-2" className="ver-mas">
                        <i className="fa-solid fa-mouse-pointer"></i>
                    </label>

                    <div className="caja-icono">
                        <div className="icono">
                            <i className="fa-solid fa-person-walking fas"></i>
                        </div>
                    </div>

                    <div className="description">
                    Las cámaras Ezviz incluyen detección de movimiento inteligente y seguimiento automático, mejorando la seguridad activa. Distinguen entre humanos y otras fuentes, reduciendo falsas alarmas y aumentando la precisión. Su seguimiento automático rastrea movimientos sospechosos en tiempo real, ofreciendo un monitoreo detallado y proactivo. Esto garantiza que cada actividad relevante sea capturada, aumentando la efectividad y confianza en la vigilancia.
                    </div>
                </div>
                <div className="feacture feacture-3">
                    <h3>Acceso Remoto y Notificaciones en Tiempo Real</h3>
                    <input type="checkbox" id="mostrar-mas-3" className="mostrar-mas" />
                    <label htmlFor="mostrar-mas-3" className="ver-mas">
                        <i className="fa-solid fa-mouse-pointer"></i>
                    </label>

                    <div className="caja-icono">
                        <div className="icono">
                            <i className="fa-solid fa-house-laptop"></i>
                        </div>
                    </div>

                    <div className="description">
                    Las cámaras Ezviz permiten monitoreo en tiempo real con notificaciones instantáneas a través de su app móvil. Los usuarios pueden ver la transmisión en vivo desde cualquier lugar y recibir alertas ante actividad inusual. Esta función mejora el control, brinda una respuesta rápida y garantiza seguridad incluso a distancia, ofreciendo mayor comodidad y tranquilidad.
                    </div>
                </div>
                <div className="feacture feacture-4">
                    <h3>Carcasa Metálica de Alta Resistencia</h3>
                    <input type="checkbox" id="mostrar-mas-4" className="mostrar-mas" />
                    <label htmlFor="mostrar-mas-4" className="ver-mas">
                        <i className="fa-solid fa-mouse-pointer"></i>
                    </label>

                    <div className="caja-icono">
                        <div className="icono">
                            <i className="fa-solid fa-dumbbell"></i>
                        </div>
                    </div>
                    <div className="description">
                    Las cámaras Ezviz para exteriores tienen carcasas de aleación de aluminio, un material duradero y resistente a la corrosión. Además, disipan el calor eficientemente, prolongando su vida útil. A diferencia de modelos plásticos, su estructura protege mejor el hardware en climas adversos, ofreciendo una durabilidad comparable a marcas como Nest y Arlo.
                    </div>
                </div>
            </section>
        </>
    )
}
