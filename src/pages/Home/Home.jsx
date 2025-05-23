import Banner from '../../components/Banner/Banner';
import LogoSlider from '../../components/LogoSlider/LogoSlider';
import Title from '../../components/Title/Title';
import Product from '../../components/Product/Product';
import Features from '../../components/Features/Features';
import Carousel from '../../components/Carousel/Carousel';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

import './Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';

export default function Home({ products }) {

    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setReady(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    if (!ready) return null;

    return (
        <>
            <LoadingOverlay isLoading={!products || products.length === 0} />
            <Banner />
            <LogoSlider />
            <Title title="ALGUNOS PRODUCTOS" />

            <div className="coverflow-container">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 2500, 
                        disableOnInteraction: false,
                    }}
                    speed={2000} // transición lenta
                    slidesPerView={3.5}
                    breakpoints={{
                        0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        },
                        480: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                        },
                        768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        },
                        1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        },
                        1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        },
                    }}
                    onSlideChange={(swiper) => {
                        document
                            .querySelectorAll('.coverflow-slide')
                            .forEach((el, index) => {
                                if (index === swiper.realIndex + 1 || (index === 0 && swiper.realIndex === swiper.slides.length - 3)) {
                                    el.classList.add('active-slide');
                                } else {
                                    el.classList.remove('active-slide');
                                }
                            });
                    }}
                    className="coverflow-swiper"
                >
                    {products?.slice(0, 8).map((product) => (
                        <SwiperSlide key={product._id} className={`coverflow-slide`}>
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
