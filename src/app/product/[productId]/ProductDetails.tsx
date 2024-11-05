"use client"
import React from "react";

interface ProductDetailsProps {
    product: any
}

const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>Image</div>
            <div>Details</div>
        </div>
     );
}
 
export default ProductDetails;