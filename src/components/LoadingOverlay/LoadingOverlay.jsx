import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import './LoadingOverlay.css';

export default function LoadingOverlay({ isLoading, text = "Cargando..." }) {
    const nodeRef = useRef(null); // ✅ Evitamos el uso de findDOMNode

    return (
        <CSSTransition
            in={isLoading}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={nodeRef} // Importante
        >
            <div ref={nodeRef} className="loading-overlay">
                <div className="spinner" />
                <p>{text}</p>
            </div>
        </CSSTransition>
    );
}
