import { createContext, useContext, useEffect, useState } from "react";

const OrderContext =  createContext();

export const useOrder = () => useContext(OrderContext);

function OrderProvider({children}) {

    //Para mostrar y ocutal el sidebar o modal de carrito
    const [isOpen, setIsOpen] = useState(false);

    const [count, setCount] = useState(0);

    const [total, setTotal] = useState(0);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        //cada vez que cambie el estado de mi carrito, hago:
        let contador = 0;
        let total = 0;
        cart.forEach((item) => {
            contador += item.quantity;
            total += item.quantity * item.price;
        })
        setCount(contador);
        setTotal(total);
    }, [cart]);

    //Funcion para cambiar el estado de cerrado a abierto y viceversa.
    function toggleCart() {

        console.log("toggleCart clicked");
        
        setIsOpen(!isOpen);

    }

    //Agregar producto (cantidad de a 1) a la cart 
    function addProduct(product) {

        //Verficamos si el producto ya está
        const productInCart = cart.find((prod) => prod.id === product.id);
        
        if (!productInCart) {
            product.quantity = 1; //Le agrego la propiedad quantity TEMPORAL
            setCart([...cart, product]);
        } else {
            product.quantity = product.quantity + 1;
            setCart([...cart]);
        }  
        
    }

    //Eliminar el producto de la cart
    function deleteProductCart(product) {

        const index = cart.findIndex((prod) => prod.id === product.id);

        cart.splice(index, 1);
        setCart([...cart]);

    }

    //Editar la cantidad de un producto en la cart
    function editQuantity(id, accion) {

        const product = cart.find((prod) => prod.id === id);

        if (accion === "+") {
            product.quantity += 1;
            setCart([...cart]);
        } else {
            if (product.quantity >= 2) {
                product.quantity -= 1;
                setCart([...cart]);
            } else {
                
                deleteProductCart(product);
            }
        }
    }

    function cleanCart() {

        setCart([]);
    }

    return (
        <OrderContext.Provider
            value={{
                cart, //Array de productos
                isOpen, // Estado del carrito
                toggleCart, //Funcion para abrir y cerrar el carrito
                addProduct,
                count,
                total,
                deleteProductCart,
                editQuantity,
                cleanCart
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;