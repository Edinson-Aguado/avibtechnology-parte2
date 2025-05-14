import './LogoSlider.css';
import logo1 from '../../assets/images/logosSlider/1.png';
import logo2 from '../../assets/images/logosSlider/2.png';
import logo3 from '../../assets/images/logosSlider/3.png';
import logo4 from '../../assets/images/logosSlider/4.png';
import logo5 from '../../assets/images/logosSlider/5.png';
import logo6 from '../../assets/images/logosSlider/6.png';
import logo7 from '../../assets/images/logosSlider/7.png';
import logo8 from '../../assets/images/logosSlider/8.png';


export default function LogoSlider() {
    const logos = [
        logo1,
        logo2,
        logo3,
        logo4,
        logo5,
        logo6,
        logo7,
        logo8,
    ];

    return (
        <section className="logo-slider-section">
            <h2 className="title">En <strong title='AVIB Technology'>AVIB</strong> puedes conseguir</h2>
            <div className="slider">
                <div className="slider-track">
                    {logos.concat(logos).map((logo, index) => (
                        <div className="slide" key={index}>
                        <img loading='lazy' src={logo} alt={`logo-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
