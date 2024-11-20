"use client"

import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

interface CartProviderProps {
    children: React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    return ( 
        <CartContextProvider>
            {children}
        </CartContextProvider>
    );
}
 
export default CartProvider;


/*

CartProvider Component
This is a wrapper component that combines CartContextProvider with additional functionality or structure if needed.
In this case, it wraps its children in the CartContextProvider.

*/