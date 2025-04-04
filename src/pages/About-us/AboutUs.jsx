import OtroTitle from '../../components/Title/OtroTitle';
import './AboutUs.css';
import perfilMasculino from '../../assets/images/about us/1.png';
import perfilFemenino from '../../assets/images/about us/2.png';
import perfilMasculino2 from '../../assets/images/about us/3.jpg';

export default function AboutUs() {
    return (
        <>
            <OtroTitle title="Sobre nosotros"/>
            <hr/>
            <main className="about-container">

                {/* Misión y Visión */}
                <section className="mission-vision">
                    <h2>Nuestra misión</h2>
                    <p>Proporcionar soluciones de seguridad inteligentes y confiables que garanticen la seguridad y tranquilidad de nuestros clientes. Creemos en el uso de tecnología avanzada para crear un mundo más seguro, una solución a la vez.</p>
                    
                    <h2>Nuestra visión</h2>
                    <p>Ser un proveedor líder de soluciones de seguridad inteligente a nivel mundial, reconocido por nuestra innovación, integridad y compromiso con la satisfacción del cliente.</p>
                </section>
            
                {/* Historia de la Empresa */}
                <section className="company-history">
                    <h2>Nuestra historia</h2>
                    <p>Fundada en 2024, Smart Security Solutions comenzó como una pequeña empresa enfocada en brindar productos de seguridad básicos. A lo largo de los años, nos hemos convertido en una marca global, pionera en sistemas de vigilancia inteligentes y soluciones de seguridad personalizadas para familias, empresas y organizaciones de todo el mundo.</p>
                </section>
            
                {/*Equipo */}
                <section className="team">
                    <h2>Conozca a nuestro equipo</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <img src={perfilMasculino}/>
                            <h3>Joe Mourphy</h3>
                            <p>CEO & Founder</p>
                        </div>
                        <div className="team-member">
                            <img src={perfilFemenino} alt="Foto de Elena Betancourt"/>
                            <h3>Elena Betancourt</h3>
                            <p>Director de tecnología</p>
                        </div>
                        <div className="team-member">
                            <img src={perfilMasculino2} alt="Foto de Félix Valderrey"/>
                            <h3>Félix Valderrey</h3>
                            <p>Jefe de Operaciones de Seguridad</p>
                        </div>
                    </div>
                </section>
            
                {/* Valores de la Empresa */}
                <section className="values">
                    <h2>Nuestros valores</h2>
                    <ul>
                        <li><strong>Integridad:</strong> Mantenemos los más altos estándares de integridad en todas nuestras acciones.</li>
                        <li><strong>Innovación:</strong> Buscamos constantemente soluciones innovadoras para mejorar la seguridad de nuestros clientes.</li>
                        <li><strong>Atención al cliente:</strong> Valoramos a nuestros clientes y nos esforzamos por cumplir y superar sus expectativas.</li>
                        <li><strong>Trabajo en equipo:</strong> Trabajamos juntos, más allá de fronteras, para satisfacer las necesidades de nuestros clientes.</li>
                    </ul>
                </section>
            
                {/* Contacto o Información adicional */}
                <section className="more-info">
                    <h2>¿Quieres saber más?</h2>
                    <p>Si está interesado en saber más sobre nosotros, no dude en contactarnos en <a href="mailto:sssavib@gmail.com">sssavib@gmail.com</a> o llámanos al (11) 27721921 (Argentina - capital).</p>
                </section>
                
            </main>
        </>
    )
}
