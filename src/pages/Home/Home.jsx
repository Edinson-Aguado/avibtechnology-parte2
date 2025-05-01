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

                {products && products?.length > 0 ? (
                    products?.map(product => {
                        console.log(product);
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
