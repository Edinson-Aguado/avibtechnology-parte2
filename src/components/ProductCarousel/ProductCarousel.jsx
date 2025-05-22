import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Product from "../Product/Product";
import "./ProductCarousel.css";

export default function ProductCarousel({ products }) {
    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
        perView: 3,
        spacing: 15,
        },
        breakpoints: {
        "(max-width: 768px)": {
            slides: {
            perView: 1,
            spacing: 10,
            },
        },
        "(max-width: 1024px)": {
            slides: {
            perView: 2,
            spacing: 10,
            },
        },
        },
    });

    return (
        <div ref={sliderRef} className="keen-slider product-carousel">
            {products.map((product) => (
                <div key={product._id} className="keen-slider__slide slide-product">
                    <Product product={product} />
                </div>
            ))}
        </div>
    );
}
