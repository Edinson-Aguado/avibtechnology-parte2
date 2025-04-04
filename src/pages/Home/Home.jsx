import Product from '../../components/Product/Product';
import Title from '../../components/Title/Title';
import './Home.css';
import Features from '../../components/Features/Features';
import Banner from '../../components/Banner/Banner';
import Carousel from '../../components/Carousel/Carousel';

export default function Home({products}) {
    return (
        <>
            <Banner />

            <Title title="PRODUCTOS" />
            <main className="main-container-home">

                {
                    products.map((product) => {
                        // DEVUELVE UN COMPONENTE CON LA INFORMACIÓN DE CADA PRODUCTO.
                        return (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        )
                    })
                }
                
            </main>

            <Features/>

            <Carousel/>
        </>
    )
}
