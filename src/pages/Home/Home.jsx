import Banner from '../../components/Banner/Banner';
import LogoSlider from '../../components/LogoSlider/LogoSlider';
import Title from '../../components/Title/Title';
import Product from '../../components/Product/Product';
import Features from '../../components/Features/Features';
import Carousel from '../../components/Carousel/Carousel';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

import './Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

export default function Home({ products }) {
    return (
        <>
            <LoadingOverlay isLoading={!products || products.length === 0} />
            <Banner />
            <LogoSlider />
            <Title title="ALGUNOS PRODUCTOS" />

            <div className="coverflow-container">
                <Swiper
                    modules={[EffectCoverflow, Navigation, Autoplay]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    speed={5000}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 120,
                        modifier: 2,
                        slideShadows: false,
                    }}
                    breakpoints={{
                        820: {
                            slidesPerView: 2.5,
                        },
                        1001: {
                            slidesPerView: 3.5,
                        },
                        1201: {
                            slidesPerView: 4.5,
                        },
                    }}
                    slidesPerView={1.3} // default para móviles
                    className="coverflow-swiper"
                >
                    {products?.slice(0, 8).map((product) => (
                        <SwiperSlide key={product._id} className="coverflow-slide">
                            <Product product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            <Features />
            <Carousel />
        </>
    );
}
