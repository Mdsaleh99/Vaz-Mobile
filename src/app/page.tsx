export const revalidate = 0

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";

import ProductCart from "./components/products/ProductCart";
import getProducts, { IProductParams } from "../../actions/getProducts";
import NullData from "./components/NullData";


interface HomeProps{
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  //  it is also a component but it is a server component means that it is rendered on server and server component makes pages to be faster because it is pre rendered on server but here we still need client component which is 'ProductCart.tsx' because we have to inter-activity with client components like onClick event, using of hooks these are client side for the inter-activity

  // how can we differniate client and sever component and how does nextjs know which is server and client component so we use ('use client') in ProductCart.tsx to identify nextjs it is a client component

  const products = await getProducts(searchParams)

  if(products.length === 0){
    return <NullData title="Ooops! No products found." />
  }

  // fishers-yates shuffle algorithm
  function shuffleArray<T>(array: T[]): T[] {
    for(let i = array.length - 1; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i as number], array[j as number]] = [array[j as number], array[i as number]];
    }

    return array
  }

  const shuffleProducts = shuffleArray(products)

  return (
    <div className="p-8">
      <Container>
        
        <HomeBanner />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
          {shuffleProducts.map((product: any, idx) => {
            return <ProductCart data={product} key={product.id} />
          })}
        </div>
      </Container>
    </div>
    
    
  );
}
