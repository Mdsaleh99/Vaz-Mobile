"use client"
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { formatPrice } from "@/uitls/formatPrice";
import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    quantity: number,
    price: number,
    selectedImg: SelectedImgType,
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[100%] my-2" />
}

const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        quantity: 1,
        price: product.price,
        selectedImg: {...product.images[0]},
    })

    console.log(cartProduct);
    
    
    /*
    
    The spread operator is used to expand or spread out elements of an array, object, or iterable into individual elements.the spread operator (...) creates a shallow copy.
    This means that it copies the references to the nested objects or arrays, not the objects or arrays themselves.
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5];
    const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5]


    The rest operator is used to collect multiple elements into an array or object. It bundles the remaining items into a single variable.
    function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
    }
    sum(1, 2, 3, 4); // 10

    const [first, ...rest] = [1, 2, 3, 4];
    console.log(first); // 1
    console.log(rest);  // [2, 3, 4]

    */

    const productRating = product.reviews.reduce((acc: number, currItem: any) => 
        currItem.rating + acc, 0) / product.reviews.length 
    
    
    const handleColorSelect = useCallback((value: SelectedImgType) => {
        // https://react.dev/reference/react/useCallback#reference
        // useCallback is a hook that helps you optimize performance by memoizing a function. It ensures the function reference stays the same across renders, unless its dependencies change. This is particularly useful when passing callbacks to child components to avoid unnecessary re-renders.       useCallback does not memoize the result of the function. It only ensures the function reference remains stable.To memoize results, use useMemo.

        setCartProduct((prev) => {
            return {...prev, selectedImg: value}
        })



    }, [cartProduct.selectedImg])


    
    const handleQtyIncrease = useCallback(() => {
        if(cartProduct.quantity === 99){
            return
        }


        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity++}
        })
    }, [cartProduct])
    
    
    const handleQtyDecrease = useCallback(() => {
        if(cartProduct.quantity === 1){
            return
        }
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity--}
        })
    }, [cartProduct])

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
            <div className="flex flex-col text-sm text-slate-700 gap-1">
                <h1 className="text-3xl text-slate-700 font-medium">{product.name}</h1>
                <div className="flex items-center gap-3">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify text-slate-800">
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold ">CATEGORY: </span>
                    {product.category}
                </div>
                <div>
                    <span className="font-semibold ">BRAND: </span>
                    {product.brand}
                </div>
                <div className={product.inStock ? 'text-green-700 font-serif' : 'text-red-600 font-serif'}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                <div>
                    <span className="font-semibold ">PRICE: </span>
                    {formatPrice(product.price)}
                </div>
                <Horizontal />
                <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
                <Horizontal />
                <SetQuantity cartProduct={cartProduct} handleQtyIncrease={handleQtyIncrease} handleQtyDecrease={handleQtyDecrease} />
                <Horizontal />
                <div className="max-w-[300px]">
                    <Button label="Add to Cart" onClick={() => {}} />
                </div>

            </div>
        </div>
    );
}
 
export default ProductDetails;