import Container from "@/app/components/Container";
import { product } from "@/uitls/product";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";

interface IParams {
    productId?: string
}

// In nextjs components are by default server component. so to make it client component we have to use "use client" in that particular page at top which component we have make client component and we have to use "use client" if we using different hooks in client side component. if we want to backend logic or database connection or access in client side at that time we have to use "use server" in that particular function where we writing backend or server logic


// Data Fecthing in nextjs
// SSR - server side rendering.  this is by default behaviour in nextjs 
// SSG - static site generation.  Any content which does not have network calls is a static page by default. this is done automatically when we run build command
// ISR or ISG - 'fetch' in nextjs caches the response. however , there are expections, fetch requests are not catched when:
// used inside a server action and used inside a route handler that uses the post method. and to opt out use: export const dynamic = 'force-dynamic' this is done automatically when we run build command. agr page bar bar re-render nhi hora hai toh ye use karna hai export const dynamic = 'force-dynamic'
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching



// it is a server component so this is not appear on browser but it will appear on server

// Destructure `params` from the argument and assign it the type `IParams`
const Product = ({params} : {params: IParams}) => {
    // it is dynamic routing. to know more check below
    // console.log(params);  // output: { productId: 'prod' } value can be any thing which given as productId for here it is 'prod' it can be any thing

    
    return ( 
        <div>
            <Container>
                <ProductDetails product={product} />
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>
                    <ListRating product={product} />
                </div>
            </Container>
        </div>
    );
}
 
export default Product;


/*



The reason we write Product = ({ params }: { params: IParams }) instead of Product = ({ params: IParams }) is due to how TypeScript and object destructuring with type annotations work.

Explanation:
Object Destructuring: When you use ({ params }) inside the function signature, you're using object destructuring, which means you're extracting the params property from the object passed into the Product function.

If you want to provide a type annotation for params (to specify its structure and type), you need to explicitly indicate that it should be typed as IParams. In this case, params is a part of the object you destructured, and you want to ensure TypeScript knows what type it is.

TypeScript Syntax: When writing TypeScript, you can't just specify the type for params directly when destructuring without referencing the overall structure. The correct way to write it is:

Product = ({ params }: { params: IParams })

({ params }: { params: IParams }) means:
You are destructuring params from the object that is passed as a parameter.
The object itself has a type { params: IParams }, meaning it has a property params of type IParams.


==========================================================================

Why not use ({ params: IParams })?
If you try to write Product = ({ params: IParams }), TypeScript will interpret it incorrectly:

params: IParams in destructuring looks like you're trying to rename the params property to IParams, not assign a type. TypeScript will think you're doing this:

const { params: IParams } = someObject;

In this context, you would be renaming the params key to IParams, which isn't what you want. You want params to be typed as IParams, not renamed.







==========================================================================

4. Dynamic Routes
You can create dynamic routes using square brackets [ ] in folder names. This allows you to create routes that vary based on parameters like IDs or slugs.

Example:

app/
  blog/
    [slug]/
      page.tsx  <-- Dynamic route for blog posts

This will generate dynamic URLs like /blog/my-first-post, /blog/nextjs-tutorial, etc., where [slug] is a dynamic parameter that you can capture and use inside the component.


Changing page.tsx
Effect: If you rename page.tsx to something else (e.g., customPage.tsx), Next.js will not recognize that file as the main page for that route.

Outcome: The route associated with that folder will stop working, and you may get a 404 error or a blank page.

==========================================================================

*/