import { products } from "@/uitls/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { truncateText } from "@/uitls/truncateText";
import ProductCart from "./components/products/ProductCart";


export default function Home() {
  //  it is also a component but it is a server component means that it is rendered on server and server component makes pages to be faster because it is pre rendered on server but here we still need client component which is 'ProductCart.tsx' because we have to inter-activity with client components like onClick event, using of hooks these are client side for the inter-activity

  // how can we differniate client and sever component and how does nextjs know which is server and client component so we use ('use client') in ProductCart.tsx to identify nextjs it is a client component
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
      </Container>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {products.map((product: any, idx) => {
          return <ProductCart data={product} key={idx} />
        })}
      </div>

    </div>
    
    
  );
}
