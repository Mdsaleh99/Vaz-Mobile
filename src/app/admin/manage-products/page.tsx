

import Container from "@/app/components/Container";
import ManageProductClient from "./ManageProductClient";
import getProducts from "../../../../actions/getProducts";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async() => {

    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()
    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Ooops! Access Denied" />
    }

    return ( 
        <div className="p-8">
            <Container>
                <ManageProductClient products={products} />
            </Container>
        </div>
    );
}
 
export default ManageProducts;