import Container from "@/app/components/Container";
import ManageOrderClient from "./ManageOrderClient";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "../../../../actions/getOrders";

const ManageOrders = async() => {

    const orders = await getOrders()
    const currentUser = await getCurrentUser()
    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Ooops! Access Denied" />
    }

    return ( 
        <div className="p-8">
            <Container>
                <ManageOrderClient orders={orders} />
            </Container>
        </div>
    );
}
 
export default ManageOrders;