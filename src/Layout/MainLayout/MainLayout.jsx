import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhatsApp from '../../components/WhatsApp/WhatsApp';
import OrderModal from '../OrderModal/OrderModal';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ useWindowWidth }) {
    return (
        <>
            <Header useWindowWidth={useWindowWidth} />
            <OrderModal />
            <WhatsApp />
            <main className="main-container-routes" style={{"flex":"1"}}>
                <Outlet/>
            </main>
            <Footer />
        </>
    );
}
