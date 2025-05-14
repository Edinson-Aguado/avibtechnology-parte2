import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhatsApp from '../../components/WhatsApp/WhatsApp';
import OrderModal from '../OrderModal/OrderModal';
import { Outlet } from 'react-router-dom';
import BtnStart from '../../components/BtnStart/BtnStart';
import NameView from '../../components/nameView/NameView';

export default function MainLayout({ useWindowWidth }) {
    return (
        <>
            <NameView/>
            <Header useWindowWidth={useWindowWidth} />
            <OrderModal />
            <BtnStart/>
            <WhatsApp />
            <main className="main-container-routes" style={{"flex":"1"}}>
                <Outlet/>
            </main>
            <Footer />
        </>
    );
}
