import './Banner.css';
import banner from "../../assets/images/banner.png";

export default function Banner() {
    return (
        <>
            <section className="section-banner">

                {/* Section de imagenes para el slider */}
                <div className="banner">
                    <img loading="lazy" src={banner} alt="Imágen del banner" className="imagen" />
                </div>

            </section>
        </>
    )
}
