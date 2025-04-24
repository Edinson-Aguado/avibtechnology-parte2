import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BtnStart.css';

export default function BtnStart() {
    return (
        <a className="btnStart" href="#">
            <FontAwesomeIcon icon={faArrowUp } />
        </a>
    )
}
