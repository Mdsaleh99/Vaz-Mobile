import Image from "next/image";
import Container from "./Container";

const HomeBanner = () => {
    return ( 
        
            <div className="relative w-full h-[380px] md:h-[500px] lg:h-[350px] xl:h-[420px]">
                <Image src="/banner.jpg" fill className="object-cover" quality={100} priority={true} alt="banner" />
                <div className="absolute inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center object-cover">
                    <Image src="/logo2.png" alt="logo" width={600} height={200} quality={100} className="flex justify-center items-center" />

                    {/* For a more accurate solution at timestamp 7:23:00, consider modifying the line inside "/app/api/create-payment-intent/route.ts" from "const total = calculateOrderAmount(items) * 100" to: "const total = Math.round(calculateOrderAmount(items) *100)". This adjustment ensures that cents are preserved, resolving the issue. Anyway, thank you for the fantastic tutorial! */}
                </div>
            </div>
            
        
    );
}
 
export default HomeBanner;