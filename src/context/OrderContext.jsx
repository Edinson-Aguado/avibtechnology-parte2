import { createContext, useContext, useEffect, useState } from "react";

const OrderContext =  createContext();

export const useOrder = () => useContext(OrderContext);

function OrderProvider({children}) {

    //Para mostrar y ocutal el sidebar o modal de carrito
    const [isOpen, setIsOpen] = useState(false);

    const [count, setCount] = useState(0);

    const [total, setTotal] = useState(0);
    
    const [cantidadOrder, setCantidad] = useState(1);

    //Buscamos desde el localStorage si hay datos, si no hay entonces retorna un array vacío...
    //Es como un "useEffect(() => {...}, []);"
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem("productsInCart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) { //Si hay un error en el localStorage o se había guardado incorrectamente, hacemos el catch:
            console.error("Error parsing cart from localStorage", e);
            return [];
        }
    });

    //--------------------------------------------------------------------------//
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
        // Guardamos el carrito completo en localStorage
        localStorage.setItem("productsInCart", JSON.stringify(cart));
    }, [cart]);

    //--------------------------------------------------------------------------//

    //Funcion para cambiar el estado de cerrado a abierto y viceversa.
    function toggleCart() {

        console.log("toggleCart clicked");
        
        setIsOpen(!isOpen);

    }

    function decidirCantidad(product, dato) {
        //Verficamos si el producto ya está
        const productInCart = cart.find((prod) => prod.id === product.id);
                
        if (!productInCart) {
            //Seteamos un copia sin afectar el original. Además de que le agregamos un nuevo producto con una propiedad extra (quantity).
            setCart([...cart, { ...product, quantity: dato }]);
        } else {
            const updatedCart = cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + dato } // Aumenta la cantidad
                    : item // Deja los otros productos igual
            );
            setCart(updatedCart); //Actualizamos el estado del carrito
        }
    }

    //Agregar producto a la cart
    function addProduct(product, dato) {

        if (dato === null) {
            decidirCantidad(product, cantidadOrder);// hay varias cantidades
        } else {
            decidirCantidad(product, dato);// dato = 1
        }
        
    }

    //Eliminar el producto de la cart
    function deleteProductCart(product) {
        const updatedCart = cart.filter((prod) => prod.id !== product.id);
        setCart(updatedCart);
    }

    //Editar la cantidad de un producto en la cart
    function editQuantity(id, accion) {
        const updatedCart = cart.map((prod) => {
            if (prod.id === id) {
                if (accion === "+") {
                    return { ...prod, quantity: prod.quantity + 1 };
                } else if (accion === "-") {
                    return { ...prod, quantity: prod.quantity - 1 };
                }
            }
            return prod;
        }).filter(prod => prod.quantity > 0); // Elimina productos con 0 cantidad
    
        setCart(updatedCart);
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
                cleanCart,
                cantidadOrder,
                setCantidad
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;