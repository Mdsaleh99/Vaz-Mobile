import { products } from "@/uitls/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { truncateText } from "@/uitls/truncateText";


export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
      </Container>

      <div>
        {products.map((product: any, idx) => {
          return <div key={idx}>
            {truncateText(product.name)}
          </div>
        })}
      </div>

    </div>
    
    
  );
}
