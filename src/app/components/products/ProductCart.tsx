'use client'

import { formatPrice } from "@/uitls/formatPrice";
import { truncateText } from "@/uitls/truncateText";
import { Rating } from "@mui/material"
import Image from "next/image";

interface ProductCartProps {
    data: any
}

const ProductCart: React.FC<ProductCartProps> = ({data}) => {
    const productRating = data.reviews.reduce((acc: number, currItem: any) => 
        currItem.rating + acc, 0) / data.reviews.length // acc is 0 initially
    
    console.log(productRating);
    

    return (
        // it is a client side component and it is rendered on client
        <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-300 bg-slate-100 rounded-2xl p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image src={data.images[0].image} alt={data.name} fill className="w-full h-full object-contain " />
                </div>
                <div className="mt-4">
                    {truncateText(data.name)}
                </div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div>{data.reviews.length} reviews</div>
                <div className="font-semibold">{formatPrice(data.price)}</div>
            </div>
        </div>
    );
}
 
export default ProductCart;


/*

The aspect-square is a shorthand in Tailwind CSS used to maintain a 1:1 aspect ratio, meaning the element will have equal width and height, forming a perfect square.

The overflow-hidden CSS property prevents content that exceeds the size of the element's box from being visible. This is especially useful when you have content or images that might overflow their container but you want to hide the excess part.

*/