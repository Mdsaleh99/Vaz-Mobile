import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";


type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null) // The context will store the cart-related data (cartTotalQty in this case).


interface Props {
    [propName: string] : any  // [propName: string] it can accept any kind of prop 
}

export const CartContextProvider = (props: Props) => {
    
    const [cartTotalQty, setcartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

    useEffect(() => { // we using this because when we click on add to cart button at that time it storing the information in localstorage as we needed but when we refresh the page it showing add to cart button so we using this

        const cartItems: any = localStorage.getItem('CartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)

    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }

            
            localStorage.setItem('CartItems', JSON.stringify(updatedCart))

            return updatedCart
        })

        toast.success('Product added to cart')

    }, [])


    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }

    return <CartContext.Provider value={value} {...props} />

    /*
        CartContextProvider:
        This is a provider component that wraps parts of the app needing access to the cart state.
        It uses React's useState to manage the cartTotalQty state (initial value is 0).
        The context's value is { cartTotalQty } (can add more data later).
        The provider shares this value to all components wrapped inside it.
    */
}


export const useCart = () => {
    const context = useContext(CartContext)

    if(context === null){
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context


    /*
    
    useCart Hook
    A custom hook is created for easier access to the cart context.
    It uses useContext to retrieve the context value.
    If the context is null (meaning the CartContextProvider isn’t wrapping the component), an error is thrown to warn the developer.
    
    */
}


/*

How It All Works Together

Context Setup:
CartContext holds the cart state (cartTotalQty).
CartContextProvider provides the state to its child components.

Accessing Context:
Use useCart to safely access cartTotalQty in any component wrapped by CartProvider.

Wrapping Components:
The CartProvider ensures the cart state is available in the wrapped components (NavBar, Footer, etc.).

Example of Accessing Context:
Inside NavBar, you could use const { cartTotalQty } = useCart(); to get the current cart quantity and display it.




Why This Setup Is Useful
Centralized State: Manages cart-related data in one place (context).
Reusability: Any component can easily access or modify the cart state using useCart.
Safety: Ensures the context is only accessed when CartContextProvider is in place.

*/