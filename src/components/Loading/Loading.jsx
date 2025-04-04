import loading from '../../assets/images/loading-gif.gif';
export default function Loading() {
    
    return (
        <>
            
            <h3 style={{textAlign:"center", margin: "12px 0"}}>Cargando...</h3>
            <img 
                src={loading} 
                alt="Gif de carga"
                style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    display: "block",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}/>
        </>
    )
}
