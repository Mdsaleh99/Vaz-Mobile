import Image from "next/image";
import Container from "./Container";

const HomeBanner = () => {
    return ( 
        
            <div className="relative w-full h-[380px] md:h-[500px] lg:h-[350px] xl:h-[420px]">
                <Image src="/banner.jpg" fill className="object-cover" quality={100} priority={true} alt="banner" />
                <div className="absolute inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center object-cover">
                    <Image src="/logo2.png" alt="logo" width={600} height={200} quality={100}  />

                    {/* For a more accurate solution at timestamp 7:23:00, consider modifying the line inside "/app/api/create-payment-intent/route.ts" from "const total = calculateOrderAmount(items) * 100" to: "const total = Math.round(calculateOrderAmount(items) *100)". This adjustment ensures that cents are preserved, resolving the issue. Anyway, thank you for the fantastic tutorial! */}
                </div>
            </div>
            
        
    );
}
 
export default HomeBanner;


/*

1. Viewport Units (vw, vh, vmin, vmax)
Viewport units are relative to the browser’s viewport size (i.e., the visible area of the web page). These units are commonly used to create responsive layouts that adjust according to the size of the screen.

2. Percentage Values (%)
Percentage values are relative to the parent element's dimensions, not the viewport. The behavior of percentage depends on the context where it's used.
Width or Height: Percentage values for width and height are calculated based on the width or height of the parent element.


Key Differences Between Viewport Units and Percentage:

Reference Point:
Viewport Units: Always relative to the browser's viewport size (screen size).
Percentage: Relative to the parent element’s size (which can change based on the parent container’s dimensions).

Responsiveness:
Viewport Units: Automatically adjust to the screen size. Good for full-screen elements, such as banners or images.
Percentage: Depends on the layout of the parent element, so it can vary depending on how the parent is styled or resized.

Use Cases:
Viewport Units: Ideal for setting dimensions based on the browser window or screen size (e.g., fullscreen backgrounds, full-height sections).
Percentage: Useful when you want an element to size relative to another element, like fluid grids, responsive widths, or heights based on the parent container.

---------------------------------------------------------------------------------------

1. Relative Positioning (position: relative;):
Relative positioning means that the element is positioned relative to its original place in the document flow.
When you apply position: relative;, the element stays in its normal position, but you can move it slightly using properties like top, right, bottom, or left.
The space that the element originally occupies in the layout is still preserved even if the element moves.

Absolute Positioning (position: absolute;):
Absolute positioning means the element is removed from the normal document flow and positioned relative to the nearest positioned ancestor (parent element with position: relative;, absolute;, or fixed;).
If there’s no such ancestor, it will be positioned relative to the viewport (browser window).
Unlike relative positioning, the space the element originally occupies is not preserved. It’s like it "floats" above other elements.

Simple Analogy:
Relative: Imagine you’re sitting in a row of chairs. If you "move" but leave your chair behind, you’re still part of the row, and people know you should be there.
Absolute: You get up and walk to another part of the room. Your original chair remains empty, and no one knows where you’ve gone. You’re completely out of the row.


*/