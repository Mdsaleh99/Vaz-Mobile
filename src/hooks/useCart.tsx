import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";


type CartContextType = {
    cartTotalQty: number,
    cartTotalAmt: number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
    paymentIntent: string | null
    handleSetPaymentIntent: (val: string | null) => void
    
}

export const CartContext = createContext<CartContextType | null>(null) // The context will store the cart-related data (cartTotalQty in this case).


interface Props {
    [propName: string] : any  // [propName: string] it can accept any kind of prop 
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * CartContextProvider:
 * Provides the cart state and related actions to its child components.
 * 
 * - Initializes and manages the state for:
 *   - cartTotalQty: The total quantity of items in the cart.
 *   - cartProducts: List of products in the cart.
 *   - cartTotalAmt: The total amount for the items in the cart.
 *   - paymentIntent: The current payment intent, if any.
 * 
 * - Persists the cart state in local storage and retrieves it on initial load.
 * 
 * - Exposes functions to:
 *   - Add/remove products from the cart.
 *   - Increase/decrease the quantity of a product in the cart.
 *   - Clear the cart.
 *   - Set a payment intent.
 * 
 * - Uses React's Context API to provide state and functions to its children.
 * 
 * @param {Props} props - Additional props to be passed to the provider.
 */

/******  320843bc-1fd9-406e-b9de-9c9baf85874d  *******/
export const CartContextProvider = (props: Props) => {
    
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [cartTotalAmt, setCartTotalAmt] = useState(0)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    // console.log("qty", cartTotalQty);
    // console.log("amount", cartTotalAmt);
    

    useEffect(() => { // we using this because when we click on add to cart button at that time it storing the information in localstorage as we needed but when we refresh the page it showing add to cart button so we using this

        const cartItems: any = localStorage.getItem('CartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent: any = localStorage.getItem('VazPaymentIntent')
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

        setCartProducts(cProducts)
        setPaymentIntent(paymentIntent)
    }, [])


    useEffect(() => {
        const getTotals = () => {
            if(cartProducts){
                const {totalAmt, qty} = cartProducts?.reduce((acc, currItem) => {
                    const itemTotal = currItem.price * currItem.quantity
                    acc.totalAmt += itemTotal
                    acc.qty += currItem.quantity
    
                    return acc
                }, {totalAmt: 0, qty: 0})


                setCartTotalQty(qty)
                setCartTotalAmt(totalAmt)
            }
        }

        getTotals()
    }, [cartProducts])

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


    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if(cartProducts){
            const filterProduct = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filterProduct)
            toast.success("Product removed")
            localStorage.setItem('CartItems', JSON.stringify(filterProduct))
        }

        
    }, [cartProducts])


    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart
        if(product.quantity === 99){
            return toast.error("Ooops! Maximum reached")
        }

        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('CartItems', JSON.stringify(updatedCart))
        }

    }, [cartProducts])


    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart
        if(product.quantity === 1){
            return toast.error("Ooops! Maximum reached")
        }

        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('CartItems', JSON.stringify(updatedCart))
        }

    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem("CartItems", JSON.stringify(null))
    }, [])


    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem('VazPaymentIntent', JSON.stringify(val))
    }, [paymentIntent])

    const value = {
        cartTotalQty,
        cartTotalAmt,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent
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