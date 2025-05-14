import Product from '../../components/Product/Product';
import Title from '../../components/Title/Title';
import './Home.css';
import Features from '../../components/Features/Features';
import Banner from '../../components/Banner/Banner';
import Carousel from '../../components/Carousel/Carousel';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import LogoSlider from '../../components/LogoSlider/LogoSlider';

export default function Home({products}) {

    const isLoading = !products || products.length === 0;

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />

            <Banner />
            <LogoSlider/>

            <Title title="ALGUNOS PRODUCTOS" />
            <main className="main-container-home">

                {products && products?.length > 0 ? (
                    products?.map(product => {
                        return (<Product key={product._id} product={product} />)
                    })
                ) : (
                    <p>No hay productos para mostrar</p>
                )}
                
            </main>

            <Features/>

            <Carousel/>
        </>
    )
}
